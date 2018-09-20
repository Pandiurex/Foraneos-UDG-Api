// Routes of rates.
const express = require('express');
const { ratesController } = require('../Controllers');

const route = express.Router();

route
  .get('/', ratesController.showAll)
  .get('/:id', ratesController.showOne)
  .post('/', ratesController.create)
  .put('/:id', ratesController.update)
  .delete('/:id', ratesController.deleteOne)
  .patch('/:id', ratesController.patch);

module.exports = route;
