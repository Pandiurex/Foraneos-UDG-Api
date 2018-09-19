// Routes of locations.
const express = require('express');
const { locationsController } = require('../Controllers');

const route = express.Router();
const routeLocations = express.Router();

route
  .get('/', locationsController.showAll)
  .get('/:id', locationsController.showOne)
  .post('/', locationsController.create)
  .put('/:id', locationsController.update)
  .delete('/:id', locationsController.deleteOne)
  .patch('/:id', locationsController.patch);

routeLocations.use('/locations', route);
module.exports = routeLocations;
