// Routes of services.
const express = require('express');
const { servicesController } = require('../controllers');
const { authMid } = require('../middlewares');

const route = express.Router();
route.get('/', [authMid.sessionChecker, authMid.havePermissions],
  servicesController.showAll);

module.exports = route;
