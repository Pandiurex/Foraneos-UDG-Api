// Routes of location_service.
const express = require('express');
const { locationServiceController } = require('../controllers');

const route = express.Router();

route
  .post('/', locationServiceController.create)
  .delete('/:userId([0-9]+)', locationServiceController.remove);

module.exports = route;
