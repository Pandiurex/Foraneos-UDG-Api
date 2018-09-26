// Routes of locations.
const express = require('express');
const { locationsController } = require('../controllers');

const route = express.Router();

route
  .get('/', locationsController.showAll)
  .get('/:id', locationsController.showOne)
  .post('/', locationsController.create)
  .put('/:id', locationsController.update)
  .delete('/:id', locationsController.remove)
  .patch('/:id', locationsController.patch);

module.exports = route;
