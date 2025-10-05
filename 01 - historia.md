Historia de usuario — Reserva con seña y pago dividido

Como capitán de un equipo de fútbol 5
Quiero reservar una cancha en Lo de Fabi, pagar una seña del 30% con Mercado Pago y dividir el resto entre mis compañeros
Para asegurar el turno rápidamente, reducir no-shows y evitar perseguir a todos por WhatsApp (¡que jueguen y paguen!).

Criterios de aceptación (Gherkin)

Escenario 1 — Reserva estándar exitosa

Dado que estoy logueado con mi cuenta

Y veo disponibilidad para la Cancha 1 el viernes 21:00–22:00

Cuando selecciono el slot y el sistema calcula el precio con tarifa pico

Y elijo “Pagar seña 30% con Mercado Pago”

Y agrego 4 compañeros por nombre/teléfono

Entonces la reserva queda Confirmada

Y se envían links de pago a los compañeros para completar el 70% antes de T-24h

Y recibo comprobante y política de cancelación por email/WhatsApp.

Escenario 2 — Vencimiento del pago dividido

Dado que hay una reserva confirmada con seña y saldo pendiente

Y faltan 24 horas para el partido

Cuando 1 o más compañeros no completan su parte

Entonces el sistema notifica al capitán

Y ofrece: (a) pagar el saldo él mismo, (b) liberar la plaza a lista de espera, (c) reprogramar sin cargo a la primera franja “eco” disponible (si la política lo permite).

Escenario 3 — Cancelación escalonada

Dado que tengo una reserva confirmada

Cuando cancelo con >24h de anticipación

Entonces recibo reembolso total de la seña al mismo medio de pago.

Y cuando cancelo entre 24–6h

Entonces recibo 50% en crédito en el wallet del sistema.

Y cuando cancelo con <6h

Entonces no hay reembolso, pero puedo transferir la reserva a otro equipo.

Escenario 4 — Clima adverso (ambientalización)

Dado pronóstico de tormenta fuerte para el horario reservado

Cuando el sistema detecta alerta meteorológica local

Entonces propone reprogramar a franja disponible o trasladar a cancha techada si existe

Y mantiene la seña sin penalidad.

Escenario 5 — Lista de espera inteligente

Dado que el slot está completo

Cuando me anoto en lista de espera

Entonces si la reserva se libera, recibo notificación inmediata con un enlace de pago válido por 15 minutos

Y si pago a tiempo, el slot pasa a Confirmado a mi nombre.

Escenario 6 — Acceso y recordatorios

Dado reserva confirmada y saldo completo

Cuando llega T-3h

Entonces el sistema envía recordatorio por WhatsApp, ubicación y código de acceso (si hay cerradura inteligente)

Y se muestran badges eco (carpool, bici-friendly) y beneficios aplicables.

Reglas de negocio

Seña: 30% al reservar (configurable).

Split: 70% repartido en partes iguales; fecha límite T-24h.

Política: >24h 100% reembolso; 24–6h 50% crédito; <6h sin reembolso (transferible).

Pagos: Mercado Pago (AR), tarjetas y QR; recibo automático.

Precios: franjas pico 18–23, eco con descuento y badge.

No-show: bloqueo temporal + seña obligatoria en próximas 3 reservas.

Clima: reprogramación sin penalidad ante alerta fuerte oficial.

UX/Contenido

Selector de fecha/hora con precio en vivo, badges Pico / Eco y ocupación.

Checkout en un paso (autocompletado) con políticas visibles, tiempo de reserva y total/seña.

Compartir link de pago a cada compañero (WhatsApp nativo) + estado de quién pagó.

Pantalla “Mi Partido” con chat breve del equipo y botón Repetir miércoles 21:00.

Analítica (eventos)

view_slot, start_checkout, pay_deposit_success, split_link_sent, split_payment_success, deadline_missed, reschedule_due_weather, waitlist_convert, noshow_flag.

No funcionales

Performance: TTFB < 500 ms, p95 checkout < 3 s en 4G.

Disponibilidad: 99.9% mensual.

Seguridad: 3-D Secure, rate limiting, auditoría.

Accesibilidad: WCAG AA (contraste y foco).

Legal: Términos, privacidad y consentimiento de comunicaciones.

Criterios de “Definition of Done”

Flujo web móvil y escritorio completo, con pagos reales en sandbox de Mercado Pago.

Emails/WhatsApp transaccionales activos (reserva, recordatorios, cambios, cancelación).

Políticas visibles y registradas en el comprobante.

Panel del capitán mostrando estado del split y botón “Cubrir saldo”.

Métricas claves en dashboard: ocupación, NSR, split completion rate.

Casos límite a cubrir en QA

Tarjeta rechazada en seña → reintento/otro medio.

Un compañero paga de más → ajuste automático y reembolso parcial.

Cambio de cancha por mantenimiento sin alterar precio.

Conexión inestable en el checkout (reintento idempotente).