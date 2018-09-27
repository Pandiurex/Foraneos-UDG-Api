const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./Routes');
const {
  errorHandler,
} = require('./Middlewares');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use('/api', routes)
  .use(errorHandler)
  .listen(3000, () => console.log('App listening on port 3000!'));

module.exports = app;
