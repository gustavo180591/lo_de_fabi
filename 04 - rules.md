# Reglas del Sistema de Reserva de Canchas

## Reglas de Autenticación y Autorización

1. **Control de Acceso Basado en Roles**
   - `ADMIN`: Acceso completo al sistema
   - `MANAGER`: Gestión de canchas, horarios y precios
   - `CAPTAIN`: Gestión de equipos y reservas
   - `PLAYER`: Usuario estándar, puede unirse a equipos y reservar

2. **Seguridad**
   - Las contraseñas deben tener mínimo 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales
   - Tokens JWT con expiración de 24 horas
   - Rate limiting: 100 peticiones por minuto por IP para endpoints públicos

## Reglas de Negocio

### Reservas
1. **Creación de Reservas**
   - Mínimo 1 hora de anticipación para nuevas reservas
   - Máximo 2 horas por reserva
   - Máximo 10 jugadores por cancha
   - Se requiere pago del 50% para confirmar la reserva

2. **Cancelaciones**
   - Cancelación gratuita hasta 24 horas antes
   - 50% de reembolso entre 12-24 horas antes
   - Sin reembolso con menos de 12 horas

3. **No Shows**
   - 3 no shows consecutivos resultan en suspensión por 30 días
   - Se cobra el 100% del valor de la reserva

### Pagos
1. **Métodos de Pago Aceptados**
   - MercadoPago
   - Transferencia bancaria
   - Efectivo en recepción

2. **Políticas**
   - Se emite factura electrónica automáticamente
   - Comisión del 10% por pagos con tarjeta
   - 5% de descuento por pago total anticipado

### Canchas
1. **Disponibilidad**
   - Horario de 8:00 a 23:00
   - Mantenimiento programado los lunes de 8:00 a 12:00
   - Capacidad máxima según tipo de cancha:
     - Fútbol 5: 10 jugadores
     - Fútbol 7: 14 jugadores
     - Fútbol 11: 22 jugadores

2. **Tarifas**
   - Precios dinámicos por horario pico (fines de semana y noches)
   - Descuentos para equipos frecuentes (más de 10 reservas/mes)

## Reglas Técnicas

### Frontend (SvelteKit 2 + Svelte 5)
1. **Componentes**
   - Usar stores de Svelte para estado global
   - Implementar lazy loading para rutas
   - Máximo 3 niveles de anidamiento de componentes

2. **Rendimiento**
   - Tiempo de carga inicial < 2s
   - Score Lighthouse > 90
   - Implementar SSR para SEO

### Backend
1. **API**
   - Todas las respuestas en formato JSON
   - Códigos de estado HTTP apropiados
   - Validación de entrada en todos los endpoints

2. **Base de Datos (PostgreSQL)**
   - Índices en campos de búsqueda frecuente
   - Backup diario automático
   - Migraciones atómicas

### Docker
1. **Contenedores**
   - Uso de volúmenes para datos persistentes
   - Variables de entorno para configuración
   - Health checks para todos los servicios

## Reglas de Monitoreo

1. **Logging**
   - Registrar todas las operaciones críticas
   - Almacenar logs por 30 días
   - Alertas para errores 5xx

2. **Métricas**
   - Tiempo de respuesta promedio < 500ms
   - Tasa de error < 0.1%
   - Uso de CPU < 70%

## Reglas de Seguridad Adicionales

1. **Protección de Datos**
   - Encriptación de datos sensibles
   - Cumplimiento de LGPD
   - Política de retención de datos

2. **Copias de Seguridad**
   - Backup completo diario
   - Retención de 7 días
   - Pruebas de restauración mensuales