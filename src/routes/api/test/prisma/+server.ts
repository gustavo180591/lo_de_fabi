import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async () => {
  try {
    // Try a simple query
    const users = await prisma.user.findMany({
      take: 5
    });
    
    return json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Prisma test error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    const errorStack = (error instanceof Error && process.env.NODE_ENV === 'development') 
      ? error.stack 
      : undefined;
      
    return json({
      success: false,
      error: errorMessage,
      ...(errorStack && { stack: errorStack })
    }, { status: 500 });
  }
};
