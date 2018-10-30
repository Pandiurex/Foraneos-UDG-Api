// Routes of messages.
const express = require('express');
const {
  messagesController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');
const { authMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/messages/', [authMid.sessionChecker, authMid.havePermissions],
    messagesController.showAll)
  .get('/:locationId/messages/:id', [authMid.sessionChecker, authMid.havePermissions],
    middlewaresErr.errMid.paramsValid, messagesController.showOne)
  .post('/:locationId/messages/', [authMid.sessionChecker, authMid.havePermissions],
    messagesController.create);

module.exports = route;
