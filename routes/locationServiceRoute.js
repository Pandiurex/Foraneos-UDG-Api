// Routes of location_service.
const express = require('express');
const {
  locationServiceController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
// FIXME Falta validar cuerpo del request
  .post('/:locationId/locationService', locationServiceController.create)
  .delete('/:locationId/locationService/:id', middlewaresErr.errMid.paramsValid, locationServiceController.remove);

module.exports = route;
