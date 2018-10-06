// index.js create group the routes.
const route = require('express').Router();
const usersRoute = require('./usersRoute');
const locationsRoute = require('./locationsRoute');
const ratesRoute = require('./ratesRoute');
const messagesRoute = require('./messagesRoute');
const livesInRoute = require('./livesInRoute');
const livesRoute = require('./livesRoute');
const complaintsRoute = require('./complaintsRoute');
const complaintTypesRoute = require('./complaintTypesRoute');
const servicesRoute = require('./servicesRoute');
const factoryRoute = require('./factoryRoute');
const emailRoute = require('./emailRoute');
const locationImageRoute = require('./locationImageRoute');
const locationServiceRoute = require('./locationServiceRoute');

route
  .get('/', (req, res) => res.send('Hello World!'))
  .use('/users', usersRoute)
  .use('/users/:userId/livesIn', livesInRoute)
  .use('/locations', locationsRoute)
  .use('/locations/:locationId/lives', livesRoute)
  .use('/locations', ratesRoute)
  .use('/locations/:locationId/messages', messagesRoute)
  .use('/locations/:locationId/complaints', complaintsRoute)
  .use('/locations/:locationId/locationService', locationServiceRoute)
  .use('/complaitTypes', complaintTypesRoute)
  .use('/services', servicesRoute)
  .use('/factory', factoryRoute)
  .use('/email', emailRoute)
  .use('/locationImage', locationImageRoute);

module.exports = route;
