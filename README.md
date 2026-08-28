# Workspace Reservation API

REST API for managing users, workspaces and workspace reservations.

This project is developed as a Backend performance test using **Node.js,
Express, TypeScript, PostgreSQL and Sequelize**. It includes JWT
authentication, role-based authorization, CRUD operations, business
validations, database relationships, seeders, Swagger documentation and
a layered architecture.

------------------------------------------------------------------------

## 🚀 Technologies

-   Node.js
-   Express
-   TypeScript
-   PostgreSQL
-   Sequelize ORM
-   JSON Web Token (JWT)
-   Swagger
-   Git
-   GitFlow
-   Conventional Commits

> No frontend is required for this project.

------------------------------------------------------------------------

## 🏗️ Architecture

The project follows a layered architecture with clear separation of
responsibilities:

``` text
Routes
   ↓
Middlewares
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Sequelize
   ↓
PostgreSQL
```

### Responsibilities

-   **Routes:** Define API endpoints.
-   **Middlewares:** Authentication, authorization, validation and error
    handling.
-   **Controllers:** Handle HTTP requests and responses.
-   **Services:** Contain business logic.
-   **Repositories:** Handle database operations.
-   **Models:** Represent database entities and their relationships
    using Sequelize.

------------------------------------------------------------------------

## 📦 Entities

The system manages three main entities.

### User

Represents registered users.

``` text
id
name
email
password
role
createdAt
updatedAt
```

Available roles:

-   `ADMIN`
-   `USER`

The email address must be unique.

### Workspace

Represents a workspace that can be reserved.

``` text
id
name
location
capacity
isAvailable
createdAt
updatedAt
```

### Reservation

Represents a reservation made by a user.

``` text
id
userId
workspaceId
reservationDate
createdAt
updatedAt
```

------------------------------------------------------------------------

## 🔗 Database Relationships

``` text
User
  │
  │ 1:N
  ▼
Reservation
  ▲
  │ N:1
  │
Workspace
```

### User → Reservation

A user can make multiple reservations, while each reservation belongs to
one user.

``` text
User 1 ─────── N Reservation
```

### Workspace → Reservation

A workspace can appear in multiple reservations on different dates,
while each reservation belongs to one workspace.

``` text
Workspace 1 ─────── N Reservation
```

------------------------------------------------------------------------

## 🔐 Authentication

The API uses **JWT** for user authentication.

### Login

``` http
POST /api/auth/login
```

Example request:

``` json
{
  "email": "admin@example.com",
  "password": "Password123"
}
```

If the credentials are valid, the API generates a JWT containing the
information required to identify the user and their role.

Protected endpoints require:

``` http
Authorization: Bearer <token>
```

------------------------------------------------------------------------

## 👥 Roles and Authorization

The system has two roles:

### ADMIN

Administrators can:

-   Manage users.
-   Create workspaces.
-   Update workspaces.
-   Delete workspaces.
-   View all reservations.

### USER

Regular users can:

-   Authenticate.
-   View workspaces.
-   Create reservations.
-   View their own reservations.
-   Perform permitted reservation operations.

Protected endpoints verify:

1.  The user is authenticated.
2.  The JWT is valid.
3.  The user has permission to perform the requested operation.

------------------------------------------------------------------------

## 🌐 API Endpoints

### Authentication

  Method   Endpoint            Description
  -------- ------------------- ------------------------------------
  POST     `/api/auth/login`   Authenticate user and generate JWT

### Users

  Method   Endpoint           Description      Access
  -------- ------------------ ---------------- ---------------
  POST     `/api/users`       Create user      Public
  GET      `/api/users`       Get all users    ADMIN
  GET      `/api/users/:id`   Get user by ID   Authenticated
  PUT      `/api/users/:id`   Update user      Authenticated
  DELETE   `/api/users/:id`   Delete user      ADMIN

### Workspaces

  Method   Endpoint                Description           Access
  -------- ----------------------- --------------------- ---------------
  POST     `/api/workspaces`       Create workspace      ADMIN
  GET      `/api/workspaces`       Get all workspaces    Authenticated
  GET      `/api/workspaces/:id`   Get workspace by ID   Authenticated
  PUT      `/api/workspaces/:id`   Update workspace      ADMIN
  DELETE   `/api/workspaces/:id`   Delete workspace      ADMIN

### Reservations

  -------------------------------------------------------------------------------------------
  Method            Endpoint                              Description       Access
  ----------------- ------------------------------------- ----------------- -----------------
  POST              `/api/reservations`                   Create            Authenticated
                                                          reservation       

  GET               `/api/reservations`                   Get all           ADMIN
                                                          reservations      

  GET               `/api/reservations/my-reservations`   Get current       Authenticated
                                                          user's            
                                                          reservations      

  GET               `/api/reservations/:id`               Get reservation   Authenticated
                                                          by ID             

  PUT               `/api/reservations/:id`               Update            Authenticated
                                                          reservation       

  DELETE            `/api/reservations/:id`               Delete            Authenticated
                                                          reservation       
  -------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 📋 Business Rules

### Users

-   Name is required.
-   Email is required.
-   Password is required.
-   Email cannot already be registered.
-   Role must be valid.

### Workspaces

-   Name is required.
-   Location is required.
-   Capacity must be greater than zero.
-   Only `ADMIN` users can create, update or delete workspaces.

### Reservations

Before creating a reservation, the API must verify:

-   The authenticated user exists.
-   The workspace exists.
-   The workspace is available.
-   There is no other reservation for the same workspace on the same
    date.

The owner of a reservation is obtained from the authenticated user. The
API must not trust a freely provided `userId` from the client.

When updating a reservation, the business rules must be checked again.

------------------------------------------------------------------------

## 🛡️ Error Handling

The API handles situations including:

-   User not found.
-   Workspace not found.
-   Reservation not found.
-   Duplicate email.
-   Invalid credentials.
-   Missing token.
-   Invalid token.
-   Unauthorized role.
-   Missing required data.
-   Invalid capacity.
-   Workspace unavailable.
-   Duplicate reservation for the same workspace and date.

HTTP status codes should correspond appropriately to the result of each
operation.

------------------------------------------------------------------------

## 🌱 Seeders

The project includes seeders with initial data for testing.

The seeders must create at least:

-   1 `ADMIN` user.
-   1 `USER` user.
-   3 workspaces.

The initial data should allow the application to be tested after running
the project.

------------------------------------------------------------------------

## 📚 Swagger

The complete REST API is documented using Swagger.

After starting the application, the documentation will be available at:

``` text
http://localhost:3000/api-docs
```

Swagger documentation should identify:

-   Available endpoints.
-   HTTP methods.
-   Parameters.
-   Request bodies.
-   Expected responses.
-   Authentication requirements.

------------------------------------------------------------------------

## 📝 JSDoc

Relevant functions and methods are documented using JSDoc.

Example:

``` typescript
/**
 * Finds a workspace by its ID.
 *
 * @param id Workspace identifier.
 * @returns The workspace or null if it does not exist.
 */
```

Swagger documentation is maintained separately for the API endpoints.

------------------------------------------------------------------------

## ⚙️ Installation

Clone the repository:

``` bash
git clone <repository-url>
```

Enter the project:

``` bash
cd workspace-reservation-api
```

Install dependencies:

``` bash
npm install
```

------------------------------------------------------------------------

## 🔧 Environment Variables

Create a `.env` file in the root directory:

``` env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=workspace_reservation
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

The `.env` file must not be committed to the repository.

------------------------------------------------------------------------

## 🗄️ Database Setup

Create a PostgreSQL database named:

``` text
workspace_reservation
```

Configure the PostgreSQL connection values in the `.env` file.

The application uses **Sequelize ORM** for persistence, models, primary
keys, foreign keys and relationships.

------------------------------------------------------------------------

## ▶️ Running the Project

Run the application in development mode:

``` bash
npm run dev
```

Build the TypeScript project:

``` bash
npm run build
```

Run the compiled application:

``` bash
npm start
```

------------------------------------------------------------------------

## 🌱 Running Seeders

Run the seeders using:

``` bash
npm run seed
```

This will insert the initial users and workspaces required to test the
application.

------------------------------------------------------------------------

## 🌿 GitFlow

The project follows GitFlow.

``` text
main
 │
 └── develop
      │
      ├── feature/authentication
      ├── feature/users
      ├── feature/workspaces
      └── feature/reservations
```

Feature branches are used to develop specific functionalities before
integrating them into `develop`.

------------------------------------------------------------------------

## 📝 Conventional Commits

Commits follow the Conventional Commits convention.

Examples:

``` text
feat: create user model
feat: implement user authentication
feat: add workspace CRUD
feat: implement reservation service
fix: validate duplicated reservations
docs: add swagger documentation
refactor: separate reservation business logic
```

Commits should represent concrete changes made during development.

------------------------------------------------------------------------

## 🔒 Security

The API protects endpoints using:

-   JWT authentication.
-   Role-based authorization.
-   Authentication middleware.
-   Authorization middleware.
-   Password hashing.
-   Request validation.
-   Environment variables for sensitive configuration.

Administrative endpoints require the `ADMIN` role, while private
endpoints require a valid JWT.

------------------------------------------------------------------------

## 📌 Project Objective

The objective of this project is to demonstrate knowledge and practical
application of:

-   Node.js
-   Express
-   TypeScript
-   PostgreSQL
-   Sequelize ORM
-   REST APIs
-   JWT authentication
-   Role-based authorization
-   CRUD operations
-   Business validations
-   Middlewares
-   Database relationships
-   Seeders
-   Swagger
-   JSDoc
-   Clean Code
-   Layered architecture
-   Git
-   GitFlow
-   Conventional Commits

------------------------------------------------------------------------

## 🚧 Project Status

**In development**

This project is being developed as a Backend performance test
simulation.
