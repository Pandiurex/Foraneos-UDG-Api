// Routes of Lives.
const express = require('express');
const { livesController } = require('../controllers');

const route = express.Router();

route
  .get('/', livesController.showAll)
  .post('/', livesController.create)
  .put('/:livesId([0-9]+)', livesController.update)
  .patch('/:livesId([0-9]+)', livesController.patch);

module.exports = route;
