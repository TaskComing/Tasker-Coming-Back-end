const swaggerJsDoc = require('swagger-jsdoc');

module.exports = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Apis Documentation',
      version: '1.0.0',
      contact: {
        name: 'John',
        email: 'jzeva1213@gmail.com',
      },
      description: 'This is the API documentation',
    },
  },
  apis: ['controllers/*.js', 'models/*.js'],
});
