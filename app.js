require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { errorHandler } = require('./middlewares');

const app = express();
const routes = require('./routes');

try {
  fs.mkdirSync('locationImages');
  fs.mkdirSync('profileImages');
} catch (err) {
  console.log('Existent dir');
}

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use('/api', routes)
  .use(errorHandler)
  .listen(process.env.PORT, () => console.log('App listening!'));

module.exports = app;
