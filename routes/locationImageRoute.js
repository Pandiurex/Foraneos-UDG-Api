// Routes of location_image.
const express = require('express');
const {
  locationImageController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
// FIXME Falta validar cuerpo del request
  .post('/', locationImageController.create)
  .delete('/:id', middlewaresErr.errMid.paramsValid, locationImageController.remove);

module.exports = route;
