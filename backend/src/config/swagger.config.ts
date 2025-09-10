import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'P360 Organization Management API',
      version: '1.0.0',
      description: 'RESTful API for P360 organization CRUD operations with Enterprise SDLC compliance',
      contact: {
        name: 'P360 Development Team',
        email: 'dev@p360.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:6601',
        description: 'Development server',
      },
      {
        url: 'http://localhost:6501',
        description: 'UAT server',
      },
      {
        url: 'http://localhost:6701',
        description: 'QA/CI server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for authentication. Format: Bearer {token}',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication information is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Unauthorized',
                  },
                  message: {
                    type: 'string',
                    example: 'Authentication token required',
                  },
                },
              },
            },
          },
        },
        ForbiddenError: {
          description: 'Access forbidden - insufficient permissions',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Forbidden',
                  },
                  message: {
                    type: 'string',
                    example: 'Insufficient permissions for this operation',
                  },
                },
              },
            },
          },
        },
        ValidationError: {
          description: 'Input validation failed',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Validation Error',
                  },
                  message: {
                    type: 'string',
                    example: 'Invalid input data',
                  },
                  details: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: {
                          type: 'string',
                          example: 'name',
                        },
                        message: {
                          type: 'string',
                          example: 'Organization name is required',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Not Found',
                  },
                  message: {
                    type: 'string',
                    example: 'Organization not found',
                  },
                },
              },
            },
          },
        },
        ConflictError: {
          description: 'Resource conflict',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Conflict',
                  },
                  message: {
                    type: 'string',
                    example: 'Organization with this name already exists',
                  },
                },
              },
            },
          },
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Internal Server Error',
                  },
                  message: {
                    type: 'string',
                    example: 'An unexpected error occurred',
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Organizations',
        description: 'Organization management endpoints',
      },
      {
        name: 'Authentication',
        description: 'Authentication and authorization endpoints',
      },
      {
        name: 'Health',
        description: 'Health check endpoints',
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/schemas/*.ts',
  ],
};

const specs = swaggerJsdoc(options);

// Custom CSS for Swagger UI
const customCss = `
  .swagger-ui .topbar { display: none }
  .swagger-ui .info .title { color: #841aff }
  .swagger-ui .scheme-container { background: #fafafa; padding: 15px; border-radius: 4px; }
`;

// Swagger UI options
const swaggerUiOptions = {
  customCss,
  customSiteTitle: 'P360 API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    tryItOutEnabled: true,
  },
};

/**
 * Setup Swagger documentation for Express app
 */
export const setupSwagger = (app: Express) => {
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));
  
  // Serve raw OpenAPI JSON spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.log('📚 Swagger documentation available at:');
  console.log(`   - Interactive UI: http://localhost:${process.env.PORT || 6601}/api-docs`);
  console.log(`   - Raw JSON spec: http://localhost:${process.env.PORT || 6601}/api-docs.json`);
};

export { specs };
export default { setupSwagger, specs };
