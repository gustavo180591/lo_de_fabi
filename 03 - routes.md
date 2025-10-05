# API Routes Documentation

## Authentication
- `POST /api/auth/register`
  - **Description**: Register a new user
  - **Tables**: `User`
  - **Fields**: `email`, `name`, `password`, `phone` (optional)

- `POST /api/auth/login`
  - **Description**: User login
  - **Tables**: `User`
  - **Fields**: `email`, `password`

## Users
- `GET /api/users`
  - **Description**: Get all users (admin only)
  - **Tables**: `User`
  - **Fields**: All user fields

- `GET /api/users/:id`
  - **Description**: Get user by ID
  - **Tables**: `User`
  - **Fields**: All user fields

- `PUT /api/users/:id`
  - **Description**: Update user
  - **Tables**: `User`
  - **Fields**: Any updatable user fields

## Teams
- `GET /api/teams`
  - **Description**: Get all teams
  - **Tables**: `Team`, `TeamMember`
  - **Fields**: Team details with members

- `POST /api/teams`
  - **Description**: Create a new team
  - **Tables**: `Team`, `TeamMember`
  - **Fields**: `name`, `logo` (optional)

- `GET /api/teams/:id`
  - **Description**: Get team by ID
  - **Tables**: `Team`, `TeamMember`, `User`
  - **Fields**: Team details with members and their user info

## Fields
- `GET /api/fields`
  - **Description**: Get all fields
  - **Tables**: `Field`
  - **Fields**: All field details

- `GET /api/fields/:id`
  - **Description**: Get field by ID
  - **Tables**: `Field`, `TimeSlot`
  - **Fields**: Field details with time slots

## Time Slots
- `GET /api/fields/:fieldId/slots`
  - **Description**: Get available time slots for a field
  - **Tables**: `TimeSlot`, `Reservation`
  - **Fields**: Time slot details with availability

## Reservations
- `GET /api/reservations`
  - **Description**: Get all reservations
  - **Tables**: `Reservation`, `User`, `Field`, `TimeSlot`
  - **Fields**: Reservation details with related data

- `POST /api/reservations`
  - **Description**: Create a new reservation
  - **Tables**: `Reservation`, `ReservationPlayer`
  - **Fields**: `fieldId`, `timeSlotId`, `date`, `players` (array)

- `GET /api/reservations/:id`
  - **Description**: Get reservation by ID
  - **Tables**: `Reservation`, `User`, `Field`, `TimeSlot`, `ReservationPlayer`
  - **Fields**: Complete reservation details

## Payments
- `POST /api/payments/process`
  - **Description**: Process a payment
  - **Tables**: `Payment`, `Reservation`, `ReservationPlayer`
  - **Fields**: `reservationId`, `amount`, `paymentMethod`

- `GET /api/payments/:id`
  - **Description**: Get payment details
  - **Tables**: `Payment`, `User`, `Reservation`
  - **Fields**: Payment details with related data

## Waitlist
- `POST /api/waitlist`
  - **Description**: Join waitlist
  - **Tables**: `Waitlist`, `User`, `Field`
  - **Fields**: `fieldId`, `date`, `startTime`, `endTime`

- `GET /api/waitlist/available`
  - **Description**: Get available waitlist slots
  - **Tables**: `Waitlist`, `Field`
  - **Fields**: Waitlist entries with field details

## Notifications
- `GET /api/notifications`
  - **Description**: Get user notifications
  - **Tables**: `Notification`, `User`
  - **Fields**: All notification fields

- `PUT /api/notifications/:id/read`
  - **Description**: Mark notification as read
  - **Tables**: `Notification`
  - **Fields**: `isRead`, `readAt`

## System
- `GET /api/settings`
  - **Description**: Get system settings
  - **Tables**: `SystemSetting`
  - **Fields**: All settings (filtered by user role)

- `GET /api/weather-alerts`
  - **Description**: Get active weather alerts
  - **Tables**: `WeatherAlert`
  - **Fields**: All active alerts

## Audit Logs
- `GET /api/audit-logs`
  - **Description**: Get audit logs (admin only)
  - **Tables**: `AuditLog`, `User`
  - **Fields**: All log entries with user info