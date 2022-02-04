const express = require('express');
const userRoutes = require('./Routes/user');
const menuRoutes = require('./Routes/menu');
const subscriberRoutes = require('./Routes/subscriber');
const mealRoutes = require('./Routes/meal');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use('/api/user', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/subscriber', subscriberRoutes);
app.use('/api/meal', mealRoutes);



app.listen(port, () =>
  console.log(`Express is listening at http://127.0.0.1:${port}`)
);

module.exports = userRoutes, menuRoutes;
