// Routes of rates.
const express = require('express');
const { ratesController } = require('../controllers');

const route = express.Router();

route
  .get('/:locationId/rates', ratesController.showAll)
  .get('/:locationId/rates:rateId([0-9]+)', ratesController.showOne)
  .post('/:locationId/rates', ratesController.create)
  .delete('/:locationId/rates:rateId([0-9]+)', ratesController.remove);

module.exports = route;
