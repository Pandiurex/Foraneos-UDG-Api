// Routes of rates.
const express = require('express');
const { ratesController } = require('../controllers');

const route = express.Router();

route
  .get('/', ratesController.showAll)
  .get('/:rateId([0-9]+)', ratesController.showOne)
  .post('/', ratesController.create)
  .delete('/:rateId([0-9]+)', ratesController.remove);

module.exports = route;
