// Routes of Lives.
const express = require('express');
const { livesController } = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
// FIXME Falta validar params en todas estas rutas para :locationId
  .get('/:locationId/lives', livesController.showAll)
  .post('/:locationId/lives', [middlewaresErr.errMid.startDateValid,
    middlewaresErr.errMid.endDateValid,
  ], livesController.create)
  // FIXME Falta validar cuerpo del request para el put y patch
  .put('/:locationId/lives/:id', livesController.update)
  .patch('/:locationId/lives/:id', livesController.patch);

module.exports = route;
