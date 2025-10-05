<script lang="ts">
  import { page } from '$app/stores';
  
  // Set the page title
  $: $page.data.title = 'Dashboard - Lo de Fabi';
  
  // Header content
  const headerTitle = 'Bienvenido de vuelta, Usuario';
  
  // Sample data - replace with actual data fetching
  const upcomingReservations = [
    {
      id: 1,
      field: 'Cancha 1 - Fútbol 5',
      date: 'Vie, 7 Oct 2023',
      time: '18:00 - 19:30',
      players: 8,
      status: 'confirmada',
      price: 2500
    },
    {
      id: 2,
      field: 'Cancha 2 - Fútbol 7',
      date: 'Sáb, 8 Oct 2023',
      time: '20:00 - 21:30',
      players: 10,
      status: 'pendiente',
      price: 3000
    }
  ];

  const quickActions = [
    { name: 'Nueva Reserva', href: '/dashboard/reservations/new', icon: 'plus-circle' },
    { name: 'Ver Canchas', href: '/dashboard/fields', icon: 'squares-2x2' },
    { name: 'Invitar Amigos', href: '/dashboard/invite', icon: 'user-plus' },
    { name: 'Historial', href: '/dashboard/history', icon: 'clock' }
  ];

  const stats = [
    { name: 'Reservas este mes', value: '5', change: '+12%', changeType: 'increase' },
    { name: 'Tiempo jugado', value: '12h 30m', change: '+2h 15m', changeType: 'increase' },
    { name: 'Próximo partido', value: 'Mañana', change: '18:00', changeType: 'neutral' },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
</script>

<svelte:head>
  <title>{$page.data.title}</title>
</svelte:head>

<h1 class="text-3xl font-bold text-gray-900 mb-6">
  {headerTitle}
</h1>

<!-- Stats -->
<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
  {#each stats as stat}
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
        <div class="mt-1">
          <span class="text-sm font-medium {stat.changeType === 'increase' ? 'text-green-600' : stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'}">
            {stat.change}
          </span>
          <span class="text-sm text-gray-500 ml-1">vs mes pasado</span>
        </div>
      </div>
    </div>
  {/each}
</div>

<!-- Quick Actions -->
<div class="mb-8">
  <h2 class="text-lg font-medium text-gray-900 mb-4">Acciones rápidas</h2>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {#each quickActions as action}
      <a href={action.href} class="bg-white overflow-hidden shadow rounded-lg hover:bg-gray-50 transition-colors duration-150">
        <div class="px-4 py-5 sm:p-6 flex items-center">
          <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <use href={`/icons/heroicons/24/outline/${action.icon}.svg`} />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">{action.name}</h3>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>

<!-- Upcoming Reservations -->
<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Próximas reservas</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Tus próximos partidos programados</p>
    </div>
    <a href="/dashboard/reservations" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Ver todas</a>
  </div>
  <div class="border-t border-gray-200">
    <ul class="divide-y divide-gray-200">
      {#if upcomingReservations.length > 0}
        {#each upcomingReservations as reservation}
          <li>
            <a href={`/dashboard/reservations/${reservation.id}`} class="block hover:bg-gray-50">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-indigo-600 truncate">{reservation.field}</p>
                  <div class="ml-2 flex-shrink-0 flex">
                    <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {reservation.status}
                    </p>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center text-sm text-gray-500">
                      <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                      </svg>
                      {reservation.date}
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>
                      {reservation.time}
                    </p>
                  </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                    </svg>
                    {reservation.players} jugadores • {formatCurrency(reservation.price)}
                  </div>
                </div>
              </div>
            </a>
          </li>
        {/each}
      {:else}
        <li class="px-4 py-12 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay reservas próximas</h3>
          <p class="mt-1 text-sm text-gray-500">Comienza reservando tu primer partido.</p>
          <div class="mt-6">
            <a href="/dashboard/reservations/new" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Nueva Reserva
            </a>
          </div>
        </li>
      {/if}
    </ul>
  </div>
</div>

<!-- Recent Activity -->
<div class="mt-8">
  <h2 class="text-lg font-medium text-gray-900 mb-4">Actividad reciente</h2>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="p-6">
      <p class="text-center text-gray-500">Próximamente: Historial de actividad</p>
    </div>
  </div>
</div>

<style>
  /* Add any custom styles here */
</style>
