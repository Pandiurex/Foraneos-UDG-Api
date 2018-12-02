const express = require('express');
const { livesInController } = require('../controllers');
const { authMid, generalMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:userId/livesIn', [generalMid.checkParamUserId,
    authMid.sessionChecker,
    authMid.havePermissions],
  livesInController.showAll);

module.exports = route;
