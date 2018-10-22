// app.js is main
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {
  errorHandler,
} = require('./middlewares');

const app = express();
const routes = require('./routes');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use('/api', routes)
  .use(errorHandler)
  .listen(process.env.PORT, () => console.log('App listening!'));

module.exports = app;
