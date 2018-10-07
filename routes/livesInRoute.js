// Routes of Lives-In.
const express = require('express');
const {
  livesInController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  .get('/', livesInController.showAll)
  .post('/', [middlewaresErr.errMid.startDateValid,
    middlewaresErr.errMid.endDateValid,
  ], livesInController.create)
  .put('/:id', livesInController.update)
  .patch('/:id', livesInController.patch);

module.exports = route;
