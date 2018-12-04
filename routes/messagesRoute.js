const express = require('express');
const { messagesController } = require('../controllers');
const { authMid, messageMid, generalMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/messages/', [generalMid.checkParamLocationId,
    authMid.sessionChecker,
    authMid.havePermissions],
  messagesController.showAll)
  .get('/:locationId/messages/:id', [generalMid.checkParamLocationId,
    generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions],
  messagesController.showOne)
  .post('/messages', [authMid.sessionChecker,
    authMid.havePermissions,
    messageMid.checkAll],
  messagesController.create);

module.exports = route;
