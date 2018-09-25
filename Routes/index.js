// index.js create group the routes.
const route = require('express').Router();
const usersRoute = require('./usersRoute');
const locationsRoute = require('./locationsRoute');
const ratesRoute = require('./ratesRoute');
const messagesRoute = require('./messagesRoute');

route
  .get('/', (req, res) => res.send('Hello World!'))
  .use('/users', usersRoute)
  .use('/locations', locationsRoute)
  .use('/rates', ratesRoute)
  .use('/messages', messagesRoute);

module.exports = route;
