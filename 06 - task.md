# Tareas y Funciones del Proyecto Lo de Fabi

## 1. Autenticación y Usuarios

### 1.1 Registro y Autenticación
- [ ] Implementar registro de usuarios (POST /api/auth/register)
  - Validar campos requeridos (email, nombre, contraseña)
  - Hashear contraseña antes de guardar
  - Enviar email de verificación
  
- [ ] Implementar login (POST /api/auth/login)
  - Validar credenciales
  - Generar y devolver JWT
  - Manejar sesiones

### 1.2 Perfil de Usuario
- [ ] Ver perfil (GET /api/users/:id)
- [ ] Actualizar perfil (PUT /api/users/:id)
- [ ] Subir/actualizar avatar
- [ ] Verificar teléfono

## 2. Gestión de Equipos

### 2.1 CRUD de Equipos
- [ ] Crear equipo (POST /api/teams)
- [ ] Listar equipos (GET /api/teams)
- [ ] Ver detalle de equipo (GET /api/teams/:id)
- [ ] Actualizar equipo (PUT /api/teams/:id)
- [ ] Eliminar equipo (DELETE /api/teams/:id)

### 2.2 Miembros del Equipo
- [ ] Añadir miembro a equipo
- [ ] Eliminar miembro de equipo
- [ ] Cambiar rol de miembro
- [ ] Listar miembros de un equipo

## 3. Gestión de Canchas

### 3.1 CRUD de Canchas
- [ ] Listar canchas disponibles (GET /api/fields)
- [ ] Ver detalle de cancha (GET /api/fields/:id)
- [ ] Crear/actualizar cancha (solo admin)
- [ ] Deshabilitar cancha (solo admin)

### 3.2 Franjas Horarias
- [ ] Obtener disponibilidad (GET /api/fields/:fieldId/slots)
- [ ] Calcular precios según franja (pico/eco)
- [ ] Validar disponibilidad en tiempo real

## 4. Sistema de Reservas

### 4.1 Creación de Reserva
- [ ] Crear reserva (POST /api/reservations)
  - Validar disponibilidad
  - Calcular monto total (30% de seña)
  - Integrar con Mercado Pago
  - Notificar a jugadores

### 4.2 Gestión de Pagos
- [ ] Procesar pago de seña
- [ ] Enviar enlaces de pago a compañeros
- [ ] Verificar estado de pagos
- [ ] Manejar vencimientos (24h antes)

### 4.3 Cancelaciones
- [ ] Cancelación con >24h (reembolso 100%)
- [ ] Cancelación 24-6h antes (50% crédito)
- [ ] Cancelación <6h antes (sin reembolso)
- [ ] Transferencia de reserva

## 5. Lista de Espera

### 5.1 Gestión de Lista
- [ ] Unirse a lista de espera (POST /api/waitlist)
- [ ] Notificar disponibilidad
- [ ] Ventana de 15 minutos para confirmar
- [ ] Proceso automático de asignación

## 6. Notificaciones

### 6.1 Sistema de Notificaciones
- [ ] Notificar recordatorios (T-3h)
- [ ] Alertas de pago pendiente
- [ ] Notificaciones de clima adverso
- [ ] Estado de reserva

## 7. Integraciones

### 7.1 Mercado Pago
- [ ] Configurar SDK
- [ ] Generar preferencias de pago
- [ ] Webhooks para notificaciones
- [ ] Manejo de reembolsos

### 7.2 Servicio Meteorológico
- [ ] Integrar con API del tiempo
- [ ] Alertas de clima adverso
- [ ] Sugerir reprogramaciones

## 8. Panel de Administración

### 8.1 Dashboard
- [ ] Resumen de reservas
- [ ] Ingresos
- [ ] Ocupación de canchas
- [ ] Métricas de uso

### 8.2 Gestión de Usuarios
- [ ] Listar/editar usuarios
- [ ] Bloquear/desbloquear cuentas
- [ ] Ver historial de reservas

## 9. Pruebas

### 9.1 Pruebas Unitarias
- [ ] Servicios de autenticación
- [ ] Lógica de reservas
- [ ] Cálculos de precios

### 9.2 Pruebas de Integración
- [ ] Flujo completo de reserva
- [ ] Integración con Mercado Pago
- [ ] Notificaciones

## 10. Despliegue y DevOps

### 10.1 Infraestructura
- [ ] Configuración de base de datos
- [ ] Variables de entorno
- [ ] Escalabilidad

### 10.2 Monitoreo
- [ ] Logs de errores
- [ ] Métricas de rendimiento
- [ ] Alertas del sistema

---

## Prioridades

### Fase 1 (MVP)
1. Autenticación básica
2. Gestión de canchas y disponibilidad
3. Sistema de reservas básico
4. Integración con Mercado Pago
5. Notificaciones por email

### Fase 2
1. Sistema de equipos
2. Lista de espera
3. Panel de administración
4. Notificaciones por WhatsApp

### Fase 3
1. Integración meteorológica
2. Análisis y reportes
3. Mejoras en UX/UI
4. Optimizaciones de rendimiento