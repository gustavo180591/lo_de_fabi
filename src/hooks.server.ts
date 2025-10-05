import { verifyToken } from '$lib/server/auth/jwt';
import { redirect, error } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

// Define the user type to match your Prisma model
type User = {
  id: string;
  email: string;
  role: string;
  name: string;
  emailVerified: boolean;
};

// Extend the Locals interface
declare global {
  namespace App {
    interface Locals {
      user: User | null;
    }
  }
}

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('auth_token');
  
  if (token) {
    try {
      const payload = verifyToken(token);
      // Attach user to locals
      event.locals.user = {
        id: payload.userId,
        email: payload.email,
        role: payload.role,
        name: '', // We'll fetch this from the database when needed
        emailVerified: true // Assuming the token is only issued after email verification
      };
    } catch (err) {
      // If token verification fails, clear the cookie
      event.cookies.delete('auth_token', { path: '/' });
    }
  }

  // Handle protected routes
  const protectedRoutes = ['/dashboard', '/api/auth/me'];
  const isProtectedRoute = protectedRoutes.some(route => event.url.pathname.startsWith(route));
  
  if (isProtectedRoute && !event.locals.user) {
    throw redirect(302, '/login');
  }

  // Handle admin routes
  const adminRoutes = ['/admin'];
  const isAdminRoute = adminRoutes.some(route => event.url.pathname.startsWith(route));
  
  if (isAdminRoute && event.locals.user?.role !== 'ADMIN') {
    throw error(403, 'Forbidden');
  }

  const response = await resolve(event);
  return response;
};
