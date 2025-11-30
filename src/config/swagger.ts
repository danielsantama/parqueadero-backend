import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Autos Colombia API',
            version: '1.0.0',
            description: 'API para gestión de parqueadero - Autenticación, movimientos, vehículos y reportes',
        },
        servers: [
            { url: process.env.BASE_URL || 'http://localhost:5000', description: 'Local server' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Ingresa el token JWT obtenido del endpoint /api/auth/login'
                },
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };