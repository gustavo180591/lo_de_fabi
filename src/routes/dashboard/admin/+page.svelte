<script lang="ts">
  import { page } from '$app/stores';
  
  // Set the page title
  export let data;
  $: $page.data.title = data.title;

  // Admin navigation items
  const navItems = [
    { name: 'Resumen', href: '/dashboard/admin', icon: 'chart-bar', current: true },
    { name: 'Usuarios', href: '/dashboard/admin/users', icon: 'users', current: false },
    { name: 'Reservas', href: '/dashboard/admin/bookings', icon: 'calendar', current: false },
    { name: 'Canchas', href: '/dashboard/admin/fields', icon: 'map-pin', current: false },
    { name: 'Pagos', href: '/dashboard/admin/payments', icon: 'credit-card', current: false },
    { name: 'Reportes', href: '/dashboard/admin/reports', icon: 'document-chart-bar', current: false },
    { name: 'Configuración', href: '/dashboard/admin/settings', icon: 'cog', current: false },
  ];

  // Sample stats - replace with real data
  const stats = [
    { name: 'Usuarios activos', value: '1,234', change: '+12%', changeType: 'increase' },
    { name: 'Reservas hoy', value: '24', change: '+3', changeType: 'increase' },
    { name: 'Ingresos del mes', value: '$124,500', change: '+8.2%', changeType: 'increase' },
    { name: 'Tasa de ocupación', value: '78%', change: '+5%', changeType: 'increase' },
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, user: 'Juan Pérez', action: 'Nueva reserva', time: 'Hace 5 minutos', icon: 'plus-circle' },
    { id: 2, user: 'María García', action: 'Registro completado', time: 'Hace 1 hora', icon: 'user-plus' },
    { id: 3, user: 'Sistema', action: 'Pago procesado', time: 'Hace 2 horas', icon: 'credit-card' },
    { id: 4, user: 'Carlos López', action: 'Reserva cancelada', time: 'Hace 3 horas', icon: 'x-circle' },
  ];

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
</script>

<div class="flex h-screen bg-gray-100">
  <!-- Sidebar -->
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64 bg-indigo-700">
      <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <h1 class="text-2xl font-bold text-white">Lo de Fabi</h1>
        </div>
        <div class="mt-5 flex-1 flex flex-col">
          <nav class="flex-1 px-2 space-y-1">
            {#each navItems as item}
              <a
                href={item.href}
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75 {item.current ? 'bg-indigo-800' : ''}"
              >
                <span class="flex-shrink-0 mr-3">
                  <i class="fas fa-{item.icon} text-indigo-300 group-hover:text-indigo-200"></i>
                </span>
                {item.name}
              </a>
            {/each}
          </nav>
        </div>
      </div>
    </div>
  </div>

  <!-- Main content -->
  <div class="flex-1 overflow-auto focus:outline-none">
    <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <div class="flex-1 px-4 flex justify-between">
        <div class="flex-1 flex items-center">
          <h1 class="text-2xl font-bold text-gray-900">Panel de Administración</h1>
        </div>
        <div class="ml-4 flex items-center md:ml-6">
          <!-- User dropdown -->
          <div class="ml-3 relative">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-700">
                {formatDate(new Date())}
              </span>
              <button 
              class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Notificaciones"
            >
              <i class="fas fa-bell h-6 w-6"></i>
            </button>
              <div class="flex items-center">
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span class="ml-2 text-sm font-medium text-gray-700">Administrador</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
      <div class="bg-white shadow">
        <div class="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div class="py-6 md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
              <div class="flex items-center">
                <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Resumen General
                </h1>
              </div>
            </div>
            <div class="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i class="fas fa-file-export mr-2"></i>
                Exportar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Resumen</h2>
          <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {#each stats as stat}
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd class="mt-1 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                  <div class={`mt-2 text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Actividad Reciente</h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {#each recentActivities as activity}
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100">
                        <i className={`fas fa-${activity.icon} text-indigo-600`}></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-500">{activity.action}</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
