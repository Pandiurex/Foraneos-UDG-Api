// Routes of messages.
const express = require('express');
const {
  messagesController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  .get('/', messagesController.showAll)
  .get('/:id', middlewaresErr.errMid.paramsValid, messagesController.showOne)
  .post('/', messagesController.create);

module.exports = route;
