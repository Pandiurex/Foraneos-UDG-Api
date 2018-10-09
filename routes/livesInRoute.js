// Routes of Lives-In.
const express = require('express');
const {
  livesInController,
} = require('../controllers');

const route = express.Router();

route
  .get('/:userId/livesIn', livesInController.showAll);

module.exports = route;
