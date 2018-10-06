// Routes of location_image.
const express = require('express');
const { locationImageController } = require('../controllers');

const route = express.Router();

route
  .post('/', locationImageController.create)
  .delete('/:userId([0-9]+)', locationImageController.remove);

module.exports = route;
