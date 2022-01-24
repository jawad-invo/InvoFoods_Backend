const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('swagger-jsdoc');
const userRoutes = require('./Routes/user');
const scheduleRoutes = require('./Routes/schedule');
const bookingRoutes = require('./Routes/booking');
const flightRoutes = require('./Routes/flight');

const app = express();
const port = 8080;

app.use('/api/user', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/flight', flightRoutes);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight booking System',
      version: '1.0.0',
      description: 'A practice project for Node JS',
    },
    servers: {
      url: 'http://localhost:8080',
    },
  },
  apis: ['../Routes/*.js'],
};

const swaggerSpecs = swaggerDocs(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(port, () =>
  console.log(`Express is listening at http://127.0.0.1:${port}`)
);

module.exports = userRoutes;
module.exports = scheduleRoutes;
module.exports = bookingRoutes;
