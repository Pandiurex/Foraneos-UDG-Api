// Routes of locations.
const express = require('express');
const locationsController = require('../Controllers/locationsController');

const api = express.Router();
const routerLocations = express.Router();

api
  .get('/', locationsController.showAll)
  .get('/:id', locationsController.showOne)
  .post('/', locationsController.create)
  .put('/:id', locationsController.update)
  .delete('/:id', locationsController.deleteOne);

routerLocations.use('/locations', api);
module.exports = routerLocations;
