# Sistema de Gestión de Tickets

Este proyecto es una aplicación full-stack para la gestión de tickets, desarrollada con Laravel en el backend y Vue.js con Vuetify en el frontend. Incluye autenticación JWT, roles de usuario y un sistema completo de tickets.

## Arquitectura del Proyecto

### Backend (Laravel API)

- **Framework**: Laravel 12

- **Lenguaje**: PHP 8.2+

- **Base de Datos**: PostgreSQL

- **Autenticación**: JWT (tymon/jwt-auth)

- **Puerto**: 8000 (cuando se ejecuta con Docker)

### Frontend (Vue.js SPA)

- **Framework**: Vue 3

- **UI Library**: Vuetify 3

- **State Management**: Pinia

- **Routing**: Vue Router

- **Build Tool**: Vite

- **Puerto**: 4173 (cuando se ejecuta con Docker)

### Base de Datos

- **Motor**: PostgreSQL 15

- **Puerto**: 5433 (cuando se ejecuta con Docker)

## Características Principales

### Backend

- API RESTful con Laravel

- Autenticación JWT

- Sistema de roles y permisos

- Gestión de usuarios

- Sistema de tickets con respuestas

- Middleware CORS y de roles

- Migraciones y seeders incluidos

### Frontend

- Interfaz de usuario moderna con Vuetify

- Páginas de autenticación (login/registro)

- Dashboard de tickets

- Gestión de usuarios (para administradores)

- Creación y manejo de tickets

- Reportes

- Diseño responsivo

## Requisitos del Sistema

- Docker y Docker Compose

- Node.js (para desarrollo local)

- PHP 8.2+ (para desarrollo local)

- Composer (para desarrollo local)

## Instalación y Configuración

### Usando Docker (Recomendado)

1. **Clonar el repositorio**

2. **Construir y ejecutar los contenedores**

```bash

docker-compose up --build

```

4. **Acceder a la aplicación**

- Frontend: http://localhost:4173

- Backend API: http://localhost:8000

- Base de datos: localhost:5433

## API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario

- `POST /api/auth/login` - Iniciar sesión

- `GET /api/me` - Obtener información del usuario actual (requiere autenticación)

- `POST /api/logout` - Cerrar sesión (requiere autenticación)

### Solicitudes (Tickets)

- `POST /api/solicitudes` - Crear nueva solicitud/ticket (requiere autenticación)

- `GET /api/solicitudes` - Listar solicitudes/tickets (requiere autenticación)

- `PUT /api/solicitudes/{id}` - Actualizar solicitud/ticket (requiere autenticación)

## Usuarios

- `GET /api/users` - Listar usuarios (solo admin y requiere autenticación)

## Usuarios de Prueba

Después de ejecutar los seeders, el sistema incluye los siguientes usuarios de prueba (todos con contraseña: `password`):

### Administrador

- **Email**: admin@example.com

- **Rol**: Admin

- **Nombre**: Admin User

### Soporte

- **Email**: support1@example.com

- **Rol**: Support

- **Nombre**: Support User One

- **Email**: support2@example.com

- **Rol**: Support

- **Nombre**: Support User Two

### Clientes

- **Email**: client1@example.com

- **Rol**: Client

- **Nombre**: Client User One

- **Email**: client2@example.com

- **Rol**: Client

- **Nombre**: Client User Two

## Tecnologías Utilizadas

### Backend

- Laravel 12

- PHP 8.2

- PostgreSQL

- JWT Auth

- Composer

### Frontend

- Vue 3

- Vuetify 3

- Pinia

- Vue Router

- Axios

- Vite

- ESLint
