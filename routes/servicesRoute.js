// Routes of services.
const express = require('express');
const { servicesController } = require('../controllers');

const route = express.Router();
route.get('/', servicesController.showAll);

module.exports = route;
