const express = require('express');
const app = express();
const port = 8080;
const userRoutes = require('./Routes/user');
const scheduleRoutes = require('./Routes/schedule');
const bookingRoutes = require('./Routes/booking');
const flightRoutes = require('./Routes/flight');


app.use('/api/user', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/flight', flightRoutes);



app.listen(port, () => {
  return console.log(`Express is listening at http://127.0.0.1:${port}`);
});

module.exports = userRoutes, scheduleRoutes, bookingRoutes;
