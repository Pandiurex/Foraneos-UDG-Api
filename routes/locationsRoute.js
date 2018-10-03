// Routes of locations.
const express = require('express');
const { locationsController } = require('../controllers');

const route = express.Router();

route
  .get('/', locationsController.showAll)
  .get('/:locationId', locationsController.showOne)
  .post('/', locationsController.create)
  .put('/:locationId', locationsController.update)
  .patch('/:locationId', locationsController.patch)
  .delete('/:locationId', locationsController.remove);

module.exports = route;
