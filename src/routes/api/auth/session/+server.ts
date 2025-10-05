import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  try {
    // Get the session token from cookies
    const sessionToken = cookies.get('session');
    
    if (!sessionToken) {
      return json({ user: null });
    }

    // Here you would typically verify the session token
    // For example, using your JWT verification if you're using JWT
    // const user = await verifyToken(sessionToken);
    
    // For now, we'll return a mock user
    // In a real app, you would get this from your database
    const mockUser = {
      id: '1',
      name: 'Admin User',
      email: 'admin@lodefabi.com',
      role: 'ADMIN'
    };

    return json({ user: mockUser });
  } catch (error) {
    console.error('Session error:', error);
    return json({ user: null }, { status: 500 });
  }
};
