// Routes of location_service.
const express = require('express');
const {
  locationServiceController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  .post('/', locationServiceController.create)
  .delete('/:id', middlewaresErr.errMid.paramsValid, locationServiceController.remove);

module.exports = route;
