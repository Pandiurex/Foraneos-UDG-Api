// Routes of Lives-In.
const express = require('express');
const {
  livesInController,
} = require('../controllers');
const { authMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:userId/livesIn', [authMid.sessionChecker, authMid.havePermissions],
    livesInController.showAll);

module.exports = route;
