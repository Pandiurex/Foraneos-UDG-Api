// Routes of Lives.
const express = require('express');
const { livesController } = require('../controllers');

const route = express.Router();

route
  .get('/', livesController.showAll)
  .post('/', livesController.create)
  .put('/:livesId', livesController.update)
  .patch('/:livesId', livesController.patch);

module.exports = route;
