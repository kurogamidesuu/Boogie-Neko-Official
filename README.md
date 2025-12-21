# Boogie Neko Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

**Boogie Neko** is a modular, high-performance e-commerce platform architected for scalability and maintainability. It leverages a modern TypeScript stack to ensure type safety across the entire domain, from database schema to frontend client.

This repository operates as a monorepo containing the core services required to run the platform.

---

## System Architecture

The platform is divided into distinct functional zones to ensure separation of concerns:

| Service | Context | Technology Stack | Status |
| :--- | :--- | :--- | :--- |
| **[Core API](./backend)** | Backend Service | **NestJS**, Prisma ORM, PostgreSQL | 🟢 Active |
| **[Storefront](./frontend)** | Client Application | **Next.js 14**, React Server Components | 🟡 In Progress |

### Core Design Principles
* **ACID Compliance:** Critical transactional integrity for Orders and Inventory management.
* **Stateless Authentication:** JWT-based security using Guard strategies and Role-Based Access Control (RBAC).
* **Data Integrity:** Strict schema validation via Class-Validator and foreign key constraints.
* **Scalable IO:** Asset management via streamed multipart uploads and static serving strategies.

---

## Development Environment Setup

### Prerequisites
* **Node.js** v18+ (LTS recommended)
* **PostgreSQL** v14+ (or Docker equivalent)
* **npm** or **yarn**

### Quick Start (Backend)

The backend service is the source of truth for the platform. It must be initialized before client applications.

1.  **Configure Environment**
    Navigate to `./backend` and establish the configuration.
    ```bash
    cd backend
    ```

2.  **Initialize Data Layer**
    The platform uses Prisma for schema management.
    ```bash
    # Run migrations to sync schema with DB
    npx prisma migrate deploy

    # Hydrate database with initial seed data
    npx prisma db seed
    ```

3.  **Start Services**
    ```bash
    npm run start:dev
    ```
    * **Health Check:** `GET http://localhost:3000/api`
    * **API Specification:** `http://localhost:3000/api` (Swagger UI)

---

## API Documentation

The Core API adheres to the OpenAPI 3.0 specification.
* **Static Definition:** [`/docs/swagger-spec.json`](./docs/swagger-spec.json) - Suitable for import into Postman, Insomnia, or code generators.
* **Live Documentation:** Auto-generated interactive documentation is available at the `/api` endpoint when running in development mode.

## Deployment & DevOps

* **Database:** PostgreSQL is the required data store.
* **Storage:** Local filesystem storage is currently configured for media assets (configured via `Multer` and `ServeStatic`).
* **CI/CD:** (Pending) Docker containers are planned for containerized deployment.
---