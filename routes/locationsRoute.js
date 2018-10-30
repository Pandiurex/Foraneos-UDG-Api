// Routes of locations.
const express = require('express');
const {
  locationsController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');
const { authMid } = require('../middlewares');

const route = express.Router();

route
  .get('/', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.orderByValid,
    middlewaresErr.errMid.limitValid,
    middlewaresErr.errMid.queryValid,
  ], locationsController.showAll)
  .get('/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.paramsValid],
  locationsController.showOne)
  .post('/', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.lattLongValid,
    middlewaresErr.errMid.streetValid,
    middlewaresErr.errMid.numLocationsValid,
    middlewaresErr.errMid.decimalLocationValid,
    middlewaresErr.errMid.roomValid,
  ], locationsController.create)
  .put('/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.paramsValid],
  locationsController.update)
  .patch('/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.paramsValid],
  locationsController.patch)
  .delete('/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.paramsValid],
  locationsController.remove);

module.exports = route;
