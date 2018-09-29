// index.js create group the routes.
const route = require('express').Router();
const usersRoute = require('./usersRoute');
const locationsRoute = require('./locationsRoute');
const ratesRoute = require('./ratesRoute');
const messagesRoute = require('./messagesRoute');
const emailsRoute = require('./emailsRoute');
const complaintsRoute = require('./complaintsRoute');
const imagesRoute = require('./imagesRoute');
const livesInRoute = require('./livesInRoute');

route
  .get('/', (req, res) => res.send('Hello World!'))
  .use('/users', usersRoute)
  .use('/locations', locationsRoute)
  .use('/rates', ratesRoute)
  .use('/messages', messagesRoute)
  .use('/emails', emailsRoute)
  .use('/complaints', complaintsRoute)
  .use('/images', imagesRoute)
  .use('/livesIn', livesInRoute);

module.exports = route;
