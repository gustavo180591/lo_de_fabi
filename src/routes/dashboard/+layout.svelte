<script lang="ts">
  import '../../app.css';
  import { onMount } from 'svelte';
  import { redirect } from '@sveltejs/kit';
  
  // Check authentication
  onMount(async () => {
    // TODO: Replace with actual auth check
    const isAuthenticated = true; // Set to false to test redirection
    if (!isAuthenticated) {
      throw redirect(302, '/login');
    }
  });

  // Mobile menu toggle
  function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon
        const menuIcons = mobileMenuButton.querySelectorAll('svg');
        menuIcons.forEach(icon => icon.classList.toggle('hidden'));
      });
    }
    
    // User menu toggle
    const userMenuButton = document.getElementById('user-menu');
    const userMenu = userMenuButton?.nextElementSibling as HTMLElement;
    
    if (userMenuButton && userMenu) {
      userMenuButton.addEventListener('click', () => {
        userMenu.classList.toggle('hidden');
      });
      
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        const target = e.target as Node;
        if (!userMenuButton.contains(target) && !userMenu.contains(target)) {
          userMenu.classList.add('hidden');
        }
      });
    }
  }

  // Run after component mounts
  import { onMount } from 'svelte';
  onMount(() => {
    setupMobileMenu();
  });
</script>

<div class="min-h-screen bg-gray-100">
  <!-- Navigation -->
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <span class="text-xl font-bold text-indigo-600">Lo de Fabi</span>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="/dashboard" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Inicio
            </a>
            <a href="/dashboard/reservations" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Mis Reservas
            </a>
            <a href="/dashboard/fields" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Canchas
            </a>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div class="ml-3 relative">
            <div>
              <button type="button" class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-expanded="false" aria-haspopup="true">
                <span class="sr-only">Abrir menú de usuario</span>
                <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  U
                </div>
              </button>
            </div>
            <!-- Dropdown menu -->
            <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              <a href="/dashboard/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Tu perfil</a>
              <a href="/dashboard/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Configuración</a>
              <a href="/logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Cerrar sesión</a>
            </div>
          </div>
        </div>
        
        <!-- Mobile menu button -->
        <div class="-mr-2 flex items-center sm:hidden">
          <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Abrir menú principal</span>
            <!-- Icon when menu is closed -->
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open -->
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div class="sm:hidden hidden" id="mobile-menu">
      <div class="pt-2 pb-3 space-y-1">
        <a href="/dashboard" class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Inicio</a>
        <a href="/dashboard/reservations" class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Mis Reservas</a>
        <a href="/dashboard/fields" class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Canchas</a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
              U
            </div>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">Usuario</div>
            <div class="text-sm font-medium text-gray-500">usuario@ejemplo.com</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <a href="/dashboard/profile" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Tu perfil</a>
          <a href="/dashboard/settings" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Configuración</a>
          <a href="/logout" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Cerrar sesión</a>
        </div>
      </div>
    </div>
  </nav>

  <div class="py-10">
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {#if $$slots.header}
          <slot name="header" />
        {:else}
          <h1 class="text-3xl font-bold text-gray-900">Panel de Control</h1>
        {/if}
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</div>
