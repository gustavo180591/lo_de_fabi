# Roadmap del Sistema de Reserva de Canchas

## Fase 1: Configuración Inicial (Sprint 1)
- [x] **Configuración del Entorno**
  - [x] Configurar repositorio Git
  - [x] Configurar Docker y docker-compose
  - [x] Configurar base de datos PostgreSQL
  - [x] Configurar SvelteKit 2 con TypeScript
  - [ ] Configurar variables de entorno
  - [ ] Configurar CI/CD básico
  - [ ] Configurar linter y formateador de código

- [x] **Autenticación y Autorización** ✅
  - [x] Implementar registro de usuarios
    - [x] Ruta: `POST /api/auth/register`
      - [x] Campos requeridos: `name`, `email`, `password`, `phone`
      - [x] Validar formato de email y fortaleza de contraseña
      - [x] Hashear contraseña antes de guardar
      - [x] Asignar rol por defecto: `PLAYER`
      - [x] Enviar email de verificación
    - [x] Ruta: `GET /api/auth/verify-email?token=xxx`
      - [x] Verificar token de email
      - [x] Actualizar `emailVerified` a `true`
  
  - [x] Implementar login/logout
    - [x] Ruta: `POST /api/auth/login`
      - [x] Campos requeridos: `email`, `password`
      - [x] Validar credenciales
      - [x] Generar JWT token
      - [x] Incluir `userId` y `role` en el payload
      - [x] Manejo de intentos fallidos
    - [x] Ruta: `POST /api/auth/logout`
      - [x] Invalidar token actual
      - [x] Limpiar cookies de sesión
  
  - [ ] Gestión de perfil de usuario
    - [ ] Ruta: `GET /api/users/me`
      - Obtener perfil del usuario autenticado
      - Incluir estadísticas de reservas
      - Mostrar estado de verificación
    - [ ] Ruta: `PUT /api/users/me`
      - Actualizar perfil (nombre, teléfono, avatar)
      - Validar formato de teléfono
      - Procesar y guardar avatar
    - [ ] Ruta: `PUT /api/users/change-password`
      - Cambiar contraseña
      - Validar contraseña actual
      - Aplicar políticas de seguridad
  
  - [ ] Recuperación de contraseña
    - [ ] Ruta: `POST /api/auth/forgot-password`
      - Generar token de recuperación (expira en 1h)
      - Enviar email con enlace seguro
      - Prevenir ataques de fuerza bruta
    - [ ] Ruta: `POST /api/auth/reset-password`
      - Validar token
      - Actualizar contraseña
      - Invalidar tokens antiguos
  
  - [ ] Sistema de roles (ADMIN, MANAGER, CAPTAIN, PLAYER)
    - [ ] Middleware de autorización por roles
    - [ ] Ruta: `GET /api/admin/users` (solo ADMIN)
      - Paginación y filtrado
      - Ordenamiento por diferentes campos
    - [ ] Ruta: `PUT /api/admin/users/:id/role` (solo ADMIN)
      - Validar transiciones de rol
      - Registrar cambios en log de auditoría
    - [ ] Ruta: `GET /api/admin/audit-logs`
      - Filtrar por usuario/acción/fecha
      - Exportar a CSV
  
  - [ ] Middleware de autenticación
    - [ ] Verificar JWT en cada solicitud
    - [ ] Proporcionar información del usuario en `locals`
    - [ ] Manejo de errores de autenticación/autorización
    - [ ] Rate limiting para endpoints sensibles
    - [ ] Detección de actividad sospechosa

## Fase 2: Gestión de Canchas (Sprint 2)
- [x] **Modelo de Datos de Canchas**
  - [x] Crear migraciones Prisma para el modelo Field
  - [ ] Implementar CRUD de canchas
    - [ ] Ruta: `GET /api/fields` - Listar canchas con filtros
    - [ ] Ruta: `GET /api/fields/:id` - Detalles de cancha
    - [ ] Ruta: `POST /api/fields` - Crear cancha (solo admin)
    - [ ] Ruta: `PUT /api/fields/:id` - Actualizar cancha
    - [ ] Ruta: `DELETE /api/fields/:id` - Deshabilitar cancha
  - [ ] Gestión de imágenes de canchas
    - [ ] Subida de imágenes a almacenamiento en la nube
    - [ ] Procesamiento de imágenes (redimensionamiento, optimización)
    - [ ] Ordenamiento de imágenes
  - [ ] Configuración de horarios y disponibilidad
    - [ ] Definir horarios de apertura/cierre
    - [ ] Configurar franjas horarias (pico/eco)
    - [ ] Gestionar días feriados y mantenimiento

- [ ] **Sistema de Reservas Básico**
  - [x] Modelo de Reserva
  - [ ] Lógica de disponibilidad
    - [ ] Verificar disponibilidad en tiempo real
    - [ ] Manejar colisiones de horarios
    - [ ] Considerar tiempo de limpieza entre reservas
  - [ ] Validación de reservas
    - [ ] Validar horarios permitidos
    - [ ] Verificar capacidad máxima
    - [ ] Validar antelación mínima/máxima

## Fase 3: Sistema de Pagos (Sprint 3)
- [ ] **Integración de Pagos**
  - [ ] Integrar MercadoPago
    - [ ] Configurar SDK de MercadoPago
    - [ ] Implementar flujo de pago de seña (30%)
    - [ ] Generar preferencias de pago individuales
    - [ ] Configurar webhooks para notificaciones
  - [ ] Procesamiento de pagos
    - [ ] Manejar pagos exitosos/fallidos
    - [ ] Actualizar estado de reserva según pago
    - [ ] Generar comprobantes digitales
  - [ ] Gestión de reembolsos
    - [ ] Reembolso total (>24h)
    - [ ] Reembolso parcial (24-6h)
    - [ ] Crédito en cuenta
  - [ ] Facturación electrónica
    - [ ] Generar facturas AFIP
    - [ ] Envío automático por email
    - [ ] Historial de facturación

- [ ] **Sistema de Equipos**
  - [ ] Creación y gestión de equipos
    - [ ] Ruta: `POST /api/teams` - Crear equipo
    - [ ] Ruta: `GET /api/teams` - Listar equipos del usuario
    - [ ] Ruta: `GET /api/teams/:id` - Detalles del equipo
    - [ ] Ruta: `PUT /api/teams/:id` - Actualizar equipo
  - [ ] Invitaciones a equipos
    - [ ] Enviar invitaciones por email/teléfono
    - [ ] Aceptar/rechazar invitaciones
    - [ ] Estado de miembros (pendiente/activo)
  - [ ] Gestión de jugadores
    - [ ] Añadir/eliminar jugadores
    - [ ] Asignar roles (capitán, jugador)
    - [ ] Estadísticas de jugadores

## Fase 4: Funcionalidades Avanzadas (Sprint 4)
- [ ] **Lista de Espera**
  - [ ] Modelo de Waitlist
    - [ ] Ruta: `POST /api/waitlist` - Unirse a lista de espera
    - [ ] Ruta: `GET /api/waitlist` - Ver lista de espera del usuario
    - [ ] Ruta: `DELETE /api/waitlist/:id` - Salir de la lista
  - [ ] Notificaciones de disponibilidad
    - [ ] Notificación inmediata al liberarse un turno
    - [ ] Ventana de 15 minutos para confirmar
    - [ ] Prioridad por antigüedad en la lista
  - [ ] Conversión automática a reserva
    - [ ] Asignación automática al confirmar
    - [ ] Notificación al resto de la lista
    - [ ] Manejo de pagos exprés

- [ ] **Sistema de Notificaciones**
  - [ ] Notificaciones por email
    - [ ] Plantillas personalizables
    - [ ] Configuración de preferencias
    - [ ] Historial de notificaciones
  - [ ] Notificaciones push
    - [ ] Integración con servicio de notificaciones
    - [ ] Notificaciones en tiempo real
    - [ ] Configuración por dispositivo
  - [ ] Recordatorios de reserva
    - [ ] Recordatorio 24h antes
    - [ ] Recordatorio 1h antes
    - [ ] Instrucciones de acceso
  - [ ] Alertas de clima adverso
    - [ ] Integración con servicio meteorológico
    - [ ] Sugerencias de reprogramación
    - [ ] Políticas de cancelación por clima

## Fase 5: Panel de Administración (Sprint 5)
- [ ] **Dashboard Administrativo**
  - [ ] Estadísticas de uso
  - [ ] Gestión de usuarios
  - [ ] Reportes financieros
  - [ ] Configuración del sistema

- [ ] **Herramientas para Administradores**
  - [ ] Gestión de precios dinámicos
  - [ ] Configuración de horarios especiales
  - [ ] Gestión de mantenimiento

## Fase 6: Mejoras de UX/UI (Sprint 6)
- [ ] **Interfaz de Usuario**
  - [ ] Diseño responsive
  - [ ] Mejoras en usabilidad
  - [ ] Temas oscuro/claro
  - [ ] Accesibilidad

- [ ] **Optimización de Rendimiento**
  - [ ] Carga perezosa de componentes
  - [ ] Caché de datos
  - [ ] Optimización de imágenes

## Fase 7: Pruebas y Despliegue (Sprint 7)
- [ ] **Pruebas**
  - [ ] Pruebas unitarias
  - [ ] Pruebas de integración
  - [ ] Pruebas de carga

- [ ] **Despliegue**
  - [ ] Configuración de producción
  - [ ] CI/CD
  - [ ] Monitoreo

## Fase 8: Lanzamiento y Post-Lanzamiento (Sprint 8)
- [ ] **Lanzamiento Controlado**
  - [ ] Beta testing con usuarios reales
  - [ ] Recolección de feedback
  - [ ] Corrección de bugs

- [ ] **Soporte y Mantenimiento**
  - [ ] Soporte a usuarios
  - [ ] Monitoreo de rendimiento
  - [ ] Actualizaciones de seguridad

## Prioridades
1. **Alta Prioridad (MVP)**
   - Autenticación
   - Gestión de canchas
   - Sistema de reservas básico
   - Pagos

2. **Media Prioridad**
   - Sistema de equipos
   - Lista de espera
   - Panel de administración

3. **Baja Prioridad**
   - Mejoras de UI/UX
   - Reportes avanzados
   - Funcionalidades premium

## Métricas de Éxito
- [ ] Tiempo promedio de reserva < 2 minutos
- [ ] Tasa de conversión > 30%
- [ ] Tiempo de respuesta API < 500ms
- [ ] Uptime > 99.9%