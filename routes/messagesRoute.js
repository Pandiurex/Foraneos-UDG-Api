// Routes of messages.
const express = require('express');
const {
  messagesController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/messages/', messagesController.showAll)
  .get('/:locationId/messages/:id', middlewaresErr.errMid.paramsValid, messagesController.showOne)
  .post('/:locationId/messages/', messagesController.create);

module.exports = route;
