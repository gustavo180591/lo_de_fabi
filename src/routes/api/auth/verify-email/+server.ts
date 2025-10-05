import { error as svelteError } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '$lib/server/auth/jwt';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ url, cookies }) => {
  const token = url.searchParams.get('token');

  if (!token) {
    throw svelteError(400, 'Token de verificación no proporcionado');
  }

  try {
    // Verify the token
    const payload = verifyToken(token);
    
    // Check if the token is for email verification
    if (payload.purpose !== 'email-verification') {
      throw new Error('Token inválido para verificación de email');
    }

    // Update the user's email verification status
    const user = await prisma.user.update({
      where: { id: payload.userId },
      data: { emailVerified: true },
      select: { id: true, email: true, name: true, role: true }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Generate a new auth token since we might have updated user data
    const { generateToken } = await import('$lib/server/auth/jwt');
    const authToken = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Update the auth cookie
    cookies.set('auth_token', authToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    // Redirect to the dashboard with a success message
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/dashboard?verified=1'
      }
    });

  } catch (err) {
    console.error('Email verification error:', err);
    throw svelteError(400, 'Token de verificación inválido o expirado');
  }
};
