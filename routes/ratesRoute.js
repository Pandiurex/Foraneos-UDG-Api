// Routes of rates.
const express = require('express');
const { ratesController } = require('../controllers');

const route = express.Router();

route
  .get('/', ratesController.showAll)
  .get('/:rateId', ratesController.showOne)
  .post('/', ratesController.create)
  .delete('/:rateId', ratesController.remove);

module.exports = route;
