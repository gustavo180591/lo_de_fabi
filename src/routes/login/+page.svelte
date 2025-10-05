<script lang="ts">
  import { page } from '$app/stores';
  
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;
  let showPassword = false;
  let redirectTo = '/';
  
  // Update redirect when URL changes
  $: {
    redirectTo = $page.url.searchParams.get('redirect') || '/';
  }

  // Handle form submission
  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    console.log('=== Iniciando proceso de login ===');
    console.log('1. Validando campos...');
    
    // Validate inputs
    if (!email || !password) {
      const errorMsg = 'Por favor ingresa tu correo y contraseña';
      console.error('Error de validación:', errorMsg);
      error = errorMsg;
      return;
    }
    
    console.log('2. Campos válidos, iniciando solicitud...');
    isLoading = true;
    error = '';
    
    try {
      console.log('3. Enviando solicitud de login a /api/auth/login');
      console.log('   - Email:', email);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email: email.trim(),
          password: password
        }),
        credentials: 'include' // Important for cookies to be sent
      });
      
      if (response.ok) {
        console.log('4. Login exitoso, redirigiendo a:', redirectTo);
        window.location.href = redirectTo; // Use window.location for full page reload
        return;
      }
      
      console.log('4. Respuesta recibida, estado:', response.status);
      
      let data;
      try {
        data = await response.json();
        console.log('5. Datos de respuesta:', data);
      } catch (parseError) {
        const errorMsg = 'Error procesando la respuesta del servidor';
        console.error('Error al analizar JSON:', parseError);
        throw new Error(errorMsg);
      }
      
      if (!response.ok) {
        const errorMsg = data?.message || `Error al iniciar sesión (${response.status})`;
        console.error('6. Error en el login:', { status: response.status, error: errorMsg });
        throw new Error(errorMsg);
      }
      
      console.log('6. ¡Login exitoso! Redirigiendo a la página principal...');
      
      // Redirigir a la página principal
      console.log('7. Actualizando URL...');
      window.history.replaceState({}, '', '/');
      
      console.log('8. Recargando la página...');
      window.location.href = '/'; // Usamos href en lugar de reload para asegurar la navegación
      
    } catch (err) {
      console.error('Login error:', err);
      error = err instanceof Error ? err.message : 'Error al iniciar sesión. Por favor intente nuevamente.';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
    </div>

    {#if error}
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span class="ml-3 text-sm font-medium text-red-800">{error}</span>
        </div>
      </div>
    {/if}

    <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Correo electrónico</label>
          <input
            id="email-address"
            bind:value={email}
            type="email"
            autocomplete="email"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Correo electrónico"
            disabled={isLoading}
          />
        </div>
        <div class="relative">
          <label for="password" class="sr-only">Contraseña</label>
          <div class="relative">
            <input
              id="password"
              bind:value={password}
              type={showPassword ? 'text' : 'password'}
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
              placeholder="Contraseña"
              disabled={isLoading}
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              on:click={() => showPassword = !showPassword}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              tabindex="-1"
              disabled={isLoading}
            >
              {#if showPassword}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              {/if}
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            disabled={isLoading}
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Recordarme
          </label>
        </div>

        <div class="text-sm">
          <a href="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {#if isLoading}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Iniciando sesión...
          {:else}
            Iniciar sesión
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
