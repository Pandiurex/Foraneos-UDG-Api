// Routes of location_service.
const express = require('express');
const {
  locationServiceController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');
const { authMid } = require('../middlewares');

const route = express.Router();

route
  .post('/:locationId/locationService', [authMid.sessionChecker, authMid.havePermissions],
    locationServiceController.create)
  .delete('/:locationId/locationService/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.paramsValid],
  locationServiceController.remove);

module.exports = route;
