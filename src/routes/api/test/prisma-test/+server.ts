import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    // Test the database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Count users as a simple test
    const userCount = await prisma.user.count();
    
    return json({
      status: 'success',
      message: 'Database connection successful',
      userCount
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return json(
      {
        status: 'error',
        message: 'Database connection failed',
        error: error.message
      },
      { status: 500 }
    );
  }
}
