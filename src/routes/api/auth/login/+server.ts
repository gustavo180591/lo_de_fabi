import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { verifyPassword } from '$lib/server/auth/password';
import { generateToken } from '$lib/server/auth/jwt';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  console.log('Login request received');
  let requestBody: { email?: string; password?: string } = {};
  
  try {
    // Parse request body with error handling
    try {
      requestBody = await request.json();
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return json(
        { 
          error: 'Invalid Request', 
          message: 'Invalid request body format',
          details: parseError instanceof Error ? parseError.message : 'Unknown error'
        },
        { status: 400 }
      );
    }

    const { email, password } = requestBody;
    console.log('Login attempt for email:', email);

    // Validate input
    if (!email || !password) {
      const missingFields = [];
      if (!email) missingFields.push('email');
      if (!password) missingFields.push('password');
      
      console.log('Missing required fields:', missingFields.join(', '));
      return json(
        { 
          error: 'Validation failed', 
          message: 'Email and password are required',
          missingFields
        },
        { status: 400 }
      );
    }

    // Find user
    console.log('Looking up user in database...');
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email }
      });
      console.log('User lookup result:', user ? 'User found' : 'User not found');
    } catch (dbError) {
      console.error('Database error during user lookup:', dbError);
      return json(
        { 
          error: 'Database Error', 
          message: 'Error looking up user',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }

    if (!user) {
      console.log('User not found for email:', email);
      return json(
        { 
          error: 'Authentication failed', 
          message: 'Invalid credentials',
          hint: 'No user found with this email address'
        },
        { status: 401 }
      );
    }

    // Verify password
    let isValidPassword = false;
    try {
      isValidPassword = await verifyPassword(password, user.password);
    } catch (err) {
      console.error('Password verification error:', err);
      return json(
        { 
          error: 'Authentication failed', 
          message: 'Error verifying password',
          details: err instanceof Error ? err.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

    if (!isValidPassword) {
      console.log('Invalid password');
      return json(
        { error: 'Authentication failed', message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Skip email verification in local environment
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction && !user.emailVerified) {
      console.log('Email not verified');
      return json(
        { 
          error: 'Email not verified', 
          message: 'Please verify your email before logging in',
          requiresVerification: true
        },
        { status: 403 }
      );
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    let token;
    try {
      token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
      });
      console.log('JWT token generated successfully');
    } catch (tokenError) {
      console.error('Error generating JWT token:', tokenError);
      return json(
        { 
          error: 'Authentication Error', 
          message: 'Error generating authentication token',
          details: tokenError instanceof Error ? tokenError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

    // Set HTTP-only cookie
    console.log('Setting auth cookie...');
    try {
      cookies.set('auth_token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      console.log('Auth cookie set successfully');
    } catch (cookieError) {
      console.error('Error setting auth cookie:', cookieError);
      return json(
        { 
          error: 'Authentication Error', 
          message: 'Error setting authentication cookie',
          details: cookieError instanceof Error ? cookieError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

    // Prepare user data for response (exclude sensitive fields)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified
    };

    console.log('Login successful for user:', userData.email);
    return json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    return json(
      {
        error: 'Internal Server Error',
        message: 'An error occurred while processing your request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
};
