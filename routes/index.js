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
const authRoute = require('./authRoute');

route
  .get('/', (req, res) => res.send('Welcome to Our System!'))
  .use('/auth', authRoute)
  .use('/users', usersRoute)
  .use('/users', livesInRoute)
  .use('/locations', locationsRoute)
  .use('/locations', livesRoute)
  .use('/locations', ratesRoute)
  .use('/locations', messagesRoute)
  .use('/locations', complaintsRoute)
  .use('/locations', locationServiceRoute)
  .use('/complaintTypes', complaintTypesRoute)
  .use('/services', servicesRoute)
  .use('/factory', factoryRoute)
  .use('/email', emailRoute)
  .use('/locationImage', locationImageRoute);

module.exports = route;
