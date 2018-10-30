// Route of factory
const express = require('express');
const { factoryController } = require('../controllers');
const { authMid } = require('../middlewares');

const route = express.Router();
route.post('/', [authMid.sessionChecker, authMid.havePermissions],
  factoryController.fillUpDB);

module.exports = route;
