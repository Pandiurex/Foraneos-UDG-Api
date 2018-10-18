// Routes of messages.
const express = require('express');
const {
  messagesController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
// FIXME Falta validar los params en todas estas rutas para :locationId
  .get('/:locationId/messages/', messagesController.showAll)
  .get('/:locationId/messages/:id', middlewaresErr.errMid.paramsValid, messagesController.showOne)
  // FIXME Falta validar cuerpo del request
  .post('/:locationId/messages/', messagesController.create);

module.exports = route;
