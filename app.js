require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./Routes');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', routes)
  .listen(process.env.PORT, () => console.log('App listening!'));

module.exports = app;
