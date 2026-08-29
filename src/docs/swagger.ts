import swaggerJsdoc from 'swagger-jsdoc';

/** Especificación OpenAPI generada a partir de los bloques JSDoc de las rutas. */
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Workspace Reservations API',
      version: '1.0.0',
      description: 'API REST del simulacro de prueba de desempeño Backend',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'password', 'role'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            password: { type: 'string', example: '123' },
            role: {
              type: 'string',
              enum: ['ADMIN', 'USER'],
            },
          },
        },
        WorkspaceInput: {
          type: 'object',
          required: ['name', 'location', 'capacity'],
          properties: {
            name: { type: 'string' },
            location: { type: 'string' },
            capacity: { type: 'integer' },
            isAvailable: { type: 'boolean' },
          },
        },
        ReservationInput: {
          type: 'object',
          required: ['workspaceId', 'reservationDate'],
          properties: {
            workspaceId: { type: 'integer' },
            reservationDate: {
              type: 'string',
              format: 'date',
              example: '2026-09-01',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
});
