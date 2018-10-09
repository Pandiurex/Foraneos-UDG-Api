// Routes of Lives.
const express = require('express');
const { livesController } = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/lives', livesController.showAll)
  .post('/:locationId/lives', [middlewaresErr.errMid.startDateValid,
    middlewaresErr.errMid.endDateValid,
  ], livesController.create)
  .put('/:locationId/lives/:id', livesController.update)
  .patch('/:locationId/lives/:id', livesController.patch);

module.exports = route;
