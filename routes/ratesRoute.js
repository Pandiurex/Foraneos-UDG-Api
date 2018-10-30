// Routes of rates.
const express = require('express');
const {
  ratesController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');
const { authMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/rates', [authMid.sessionChecker, authMid.havePermissions],
    ratesController.showAll)
  .get('/:locationId/rates/:id', [authMid.sessionChecker, authMid.havePermissions],
    middlewaresErr.errMid.paramsValid, ratesController.showOne)
  .post('/:locationId/rates', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.validDate,
    middlewaresErr.errMid.numberRateValid,
  ], ratesController.create)
  .delete('/:locationId/rates/:id', [authMid.sessionChecker, authMid.havePermissions],
    ratesController.remove);

module.exports = route;
