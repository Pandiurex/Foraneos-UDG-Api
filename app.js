// app.js is main
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler, roles } = require('./middlewares');
const { ROLEACCESS } = require('./constants');

const app = express();
const routes = require('./routes');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use('/api', roles.userRoleAuth({ ...ROLEACCESS }))
  .use('/api', routes)
  .use(errorHandler)
  .listen(process.env.PORT, () => console.log('App listening!'));

module.exports = app;
