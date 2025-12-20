# Young Adults Study Center - Backend API

Backend API for Young Adults Study Center built with NestJS and MongoDB.

## Features

- ✅ Authentication (JWT)
- ✅ Role-based access control (RBAC)
- ✅ Staff management
- ✅ Branches management
- ✅ Courses management
- ✅ Statistics
- ✅ Countries (Consulting)
- ✅ Applications management
- ✅ About & Contact info
- ✅ File upload
- ✅ Swagger documentation
- ✅ Rate limiting
- ✅ Input validation

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and add your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/young-adults
```

## Running the app

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Documentation

Once the app is running, visit:
- Swagger UI: http://localhost:5000/api/docs

## Environment Variables

See `.env.example` for all required environment variables.

## API Endpoints

### Public Endpoints
- `GET /api/staff` - Get all staff
- `GET /api/staff/:slug` - Get staff by slug
- `GET /api/branches` - Get all branches
- `GET /api/courses` - Get all courses
- `GET /api/countries` - Get all countries
- `GET /api/statistics` - Get statistics
- `GET /api/about` - Get about info
- `GET /api/contact` - Get contact info
- `POST /api/applications` - Create application
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Protected Endpoints (Admin only)
- All CRUD operations for Staff, Branches, Courses, Countries
- Applications management
- About & Contact updates
- File upload

## User Roles

- `super_admin` - Full access
- `admin` - CRUD operations
- `moderator` - Applications management
- `teacher` - Read-only access
- `user` - Public access

## License

Private

