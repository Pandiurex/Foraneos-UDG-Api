// Routes of rates.
const express = require('express');
const {
  ratesController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  .get('/:id/rates', ratesController.showAll)
  // .get('/:id/rates/:id', middlewaresErr.errMid.paramsValid, ratesController.showOne)
  .post('/:id/rates', [middlewaresErr.errMid.validDate,
    middlewaresErr.errMid.numberRateValid,
  ], ratesController.create)
  .delete('/:id/rates/:id', ratesController.remove);

module.exports = route;
