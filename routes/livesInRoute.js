// Routes of Lives-In.
const express = require('express');
const {
  livesInController,
} = require('../controllers');

const route = express.Router();

route
  .get('/', livesInController.showAll)
  .get('/:id', livesInController.showOne)
  .post('/', livesInController.create)
  .put('/:id', livesInController.update)
  .delete('/:id', livesInController.remove)
  .patch('/:id', livesInController.patch);

module.exports = route;
