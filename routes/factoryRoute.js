// Route of factory
const express = require('express');
const { factoryController } = require('../controllers');
const { authMid, factoryMid } = require('../middlewares');

const route = express.Router();
route.post('/', [authMid.sessionChecker,
  authMid.havePermissions,
  factoryMid.checkAll],
factoryController.fillUpDB);

module.exports = route;
