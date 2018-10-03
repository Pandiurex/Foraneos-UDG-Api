// Routes of Lives-In.
const express = require('express');
const {
  livesInController,
} = require('../controllers');

const route = express.Router();

route
  .get('/', livesInController.showAll)
  .post('/', livesInController.create)
  .put('/:livesInId([0-9]+)', livesInController.update)
  .patch('/:livesInId([0-9]+)', livesInController.patch);

module.exports = route;
