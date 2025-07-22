# Lead City Microfinance Bank - Web Application

## Overview

This is a full-stack web application for Lead City Microfinance Bank, built with React frontend, Express.js backend, and PostgreSQL database. The application provides digital banking services including account opening, loan applications, contact forms, and branch information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and building
- **Styling**: Custom CSS variables with brand colors (green and orange theme)

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Middleware**: Request logging, JSON parsing, error handling
- **Development**: Integrated with Vite for hot reloading

### Database Architecture
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: Shared between client and server (`shared/schema.ts`)
- **Migrations**: Managed by Drizzle Kit
- **Connection**: Neon Database serverless connection

## Key Components

### Frontend Pages
- **Home**: Hero section with product cards and FAQ
- **About**: Company information and values
- **Products**: Detailed product listings (savings, current, fixed deposit accounts)
- **Account Opening**: Multi-step form for account applications
- **Loan Application**: Comprehensive loan application form
- **Online Banking**: Mock banking dashboard (demo only)
- **Branches**: Branch locator with map integration
- **Contact**: Contact form and company information

### UI Components
- Complete shadcn/ui component library integration
- Custom components: Navigation, Footer, ProductCard, FAQSection
- Interactive features: WhatsApp button, Live chat widget
- Form handling with react-hook-form and Zod validation

### Backend API Endpoints
- `POST /api/account-applications` - Submit account applications
- `GET /api/account-applications` - Retrieve account applications
- `POST /api/loan-applications` - Submit loan applications
- `GET /api/loan-applications` - Retrieve loan applications
- `POST /api/contact-messages` - Submit contact messages
- `GET /api/contact-messages` - Retrieve contact messages
- `GET /api/branches` - Retrieve branch information

### Database Schema
- **users**: User authentication (basic structure)
- **account_applications**: Account opening applications
- **loan_applications**: Loan applications with business details
- **contact_messages**: Customer contact form submissions
- **branches**: Bank branch locations and details

## Data Flow

1. **Client Requests**: User interactions trigger API calls through TanStack Query
2. **API Processing**: Express routes validate input using Zod schemas
3. **Database Operations**: Storage layer handles CRUD operations via Drizzle ORM
4. **Response Handling**: JSON responses with proper error handling
5. **UI Updates**: TanStack Query manages cache and UI state updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for Neon database
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling with validation
- **@hookform/resolvers**: Zod integration for form validation

### UI Dependencies
- **@radix-ui/***: Headless UI primitives (30+ components)
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: CSS class management

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for server
- **esbuild**: Production server bundling

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution with auto-reload
- **Database**: Drizzle push for schema changes

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Server**: Express serves static files and API routes
- **Database**: PostgreSQL connection via environment variable

### Environment Configuration
- `NODE_ENV`: Development/production mode
- `DATABASE_URL`: PostgreSQL connection string (required)
- Vite configuration for aliases and build settings
- TypeScript paths for clean imports (@, @shared, @assets)

The application is designed for deployment on platforms that support Node.js with PostgreSQL, with specific optimizations for Replit environment including development banner integration and runtime error overlay.