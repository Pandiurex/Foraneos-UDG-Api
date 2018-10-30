// Routes of location_image.
const express = require('express');
const {
  locationImageController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');
const { authMid } = require('../middlewares');

const route = express.Router();

route
  .post('/', [authMid.sessionChecker, authMid.havePermissions],
    locationImageController.create)
  .delete('/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.paramsValid],
  locationImageController.remove);

module.exports = route;
