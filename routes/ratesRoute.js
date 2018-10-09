// Routes of rates.
const express = require('express');
const {
  ratesController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/rates', ratesController.showAll)
  .get('/:locationId/rates/:id', middlewaresErr.errMid.paramsValid, ratesController.showOne)
  .post('/:locationId/rates', [ // middlewaresErr.errMid.validDate,
    middlewaresErr.errMid.numberRateValid,
  ], ratesController.create)
  .delete('/:locationId/rates/:id', ratesController.remove);

module.exports = route;
