import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // TODO: Add proper authentication check
  // if (!locals.user || locals.user.role !== 'ADMIN') {
  //   throw redirect(302, '/login');
  // }

  return {
    title: 'Panel de Administración',
    user: {
      name: 'Administrador',
      email: 'admin@lodefabi.com',
      role: 'ADMIN'
    }
  };
};
