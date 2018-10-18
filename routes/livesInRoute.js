// Routes of Lives-In.
const express = require('express');
const {
  livesInController,
} = require('../controllers');

const route = express.Router();

route
// FIXME Falta validar los params de :userId
  .get('/:userId/livesIn', livesInController.showAll);

module.exports = route;
