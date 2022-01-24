const express = require('express');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./Routes/user');
const scheduleRoutes = require('./Routes/schedule');
const bookingRoutes = require('./Routes/booking');
const flightRoutes = require('./Routes/flight');

const app = express();
const port = 8080;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Flight Management System APIs',
      description:
        'This documentation define the APIs Documentation for the system.',
      contact: {
        name: 'jawadakhter7@gmail.com',
      },
      servers: ['http://localhost:8080'],
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/user', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/flight', flightRoutes);

app.listen(port, () =>
  console.log(`Express is listening at http://127.0.0.1:${port}`)
);

module.exports = userRoutes;
module.exports = scheduleRoutes;
module.exports = bookingRoutes;
