// Routes of Lives-In.
const express = require('express');
const {
  livesInController,
} = require('../controllers');

const route = express.Router();

route
  .get('/', livesInController.showAll)
  .post('/', livesInController.create)
  .put('/:livesInId', livesInController.update)
  .patch('/:livesInId', livesInController.patch);

module.exports = route;
