import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { hashPassword } from '$lib/server/auth/password';
import { generateToken } from '$lib/server/auth/jwt';
import { sendVerificationEmail } from '$lib/server/email/service';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  console.log('Register endpoint hit');
  try {
    const { name, email, password, phone } = await request.json();

    // Validate input
    if (!name || !email || !password || !phone) {
      return json(
        { 
          error: 'Registration failed',
          message: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    // Validate password strength - At least 8 chars, 1 uppercase, 1 lowercase, 1 number, special chars allowed
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return json(
        { 
          error: 'Registration failed',
          message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número (se permiten caracteres especiales)' 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return json(
        { 
          error: 'Registration failed',
          message: 'User already exists' 
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'PLAYER',
        emailVerified: false // Will be set to true after email verification
      }
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Set HTTP-only cookie
    cookies.set('auth_token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    try {
      // Send verification email
      await sendVerificationEmail(user.email, user.name, user.id);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue with registration even if email sending fails
    }

    console.log('User created successfully:', { id: user.id, email: user.email });
    return json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    const errorStack = (error instanceof Error && process.env.NODE_ENV === 'development') 
      ? error.stack 
      : undefined;
      
    return json({ 
      error: 'Internal server error',
      message: errorMessage,
      ...(errorStack && { stack: errorStack })
    }, { status: 500 });
  }
};
