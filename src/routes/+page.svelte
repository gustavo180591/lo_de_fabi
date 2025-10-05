<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  
  let user = $state<any>(null);
  
  onMount(async () => {
    try {
      // Check if user is already logged in
      const response = await fetch('/api/auth/session', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          user = data.user;
          return; // User is logged in, show dashboard
        }
      }
      
      // If not logged in, redirect to login with redirect back to home
      goto(`/login?redirect=${encodeURIComponent($page.url.pathname)}`);
    } catch (error) {
      console.error('Error checking session:', error);
      goto('/login');
    }
  });
  
  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Navbar -->
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <span class="text-xl font-bold text-indigo-600">Lo de Fabi</span>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="/" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Inicio
            </a>
            {#if user}
              <a href="/dashboard" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Panel
              </a>
            {/if}
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          {#if user}
            <div class="ml-3 relative">
              <div>
                <button type="button" class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Abrir menú de usuario</span>
                  <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>
              </div>
              <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Tu perfil</a>
                <button on:click={handleLogout} class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Cerrar sesión
                </button>
              </div>
            </div>
          {:else}
            <a href="/login" class="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Iniciar sesión
            </a>
          {/if}
        </div>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="py-10">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      {#if user}
        <div class="px-4 py-8 sm:px-0">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Bienvenido, {user.name || 'Usuario'}</h2>
              <p class="text-gray-600">Has iniciado sesión correctamente en el sistema.</p>
              <div class="mt-6">
                <a href="/dashboard" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Ir al panel de control
                </a>
              </div>
            </div>
          </div>
        </div>
      {:else}
        <div class="text-center py-12">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Bienvenido a Lo de Fabi</h1>
          <p class="text-lg text-gray-600 mb-8">Inicia sesión para acceder a tu cuenta</p>
          <a href="/login" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Iniciar sesión
          </a>
        </div>
      {/if}
    </div>
  </main>
</div>
