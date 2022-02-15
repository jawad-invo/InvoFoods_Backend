const express = require('express');
const userRoutes = require('./Routes/user');
const menuRoutes = require('./Routes/menu');
const subscriberRoutes = require('./Routes/subscriber');
const mealRoutes = require('./Routes/meal');
const invoiceRoutes = require('./Routes/invoice');

var cors = require('cors')

const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var multipart = require('connect-multiparty');
app.use(multipart());

app.use('/api/user', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/subscriber', subscriberRoutes);
app.use('/api/meal', mealRoutes);
app.use('/api/invoice', invoiceRoutes);

app.listen(port, () =>
  console.log(`Express is listening at http://127.0.0.1:${port}`)
);

module.exports = userRoutes, menuRoutes, subscriberRoutes, mealRoutes, invoiceRoutes;
