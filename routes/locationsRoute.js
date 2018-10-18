// Routes of locations.
const express = require('express');
const {
  locationsController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  .get('/', [ // middlewaresErr.errMid.orderByValid,
    // middlewaresErr.errMid.limitValid,
    middlewaresErr.errMid.queryValid,
  ], locationsController.showAll)
  .get('/:id', middlewaresErr.errMid.paramsValid, locationsController.showOne)
  .post('/', [middlewaresErr.errMid.lattLongValid,
    middlewaresErr.errMid.streetValid,
    middlewaresErr.errMid.numLocationsValid,
    middlewaresErr.errMid.decimalLocationValid,
    middlewaresErr.errMid.roomValid,
  ], locationsController.create)
  // FIXME Falta validar cuerpo del request para el put y patch
  .put('/:id', middlewaresErr.errMid.paramsValid, locationsController.update)
  .patch('/:id', middlewaresErr.errMid.paramsValid, locationsController.patch)
  .delete('/:id', middlewaresErr.errMid.paramsValid, locationsController.remove);

module.exports = route;
