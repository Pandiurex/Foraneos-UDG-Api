// Routes of locations.
const express = require('express');
const { locationsController } = require('../controllers');

const route = express.Router();

route
  .get('/', locationsController.showAll)
  .get('/:locationId([0-9]+)', locationsController.showOne)
  .post('/', locationsController.create)
  .put('/:locationId([0-9]+)', locationsController.update)
  .patch('/:locationId([0-9]+)', locationsController.patch)
  .delete('/:locationId([0-9]+)', locationsController.remove);

module.exports = route;
