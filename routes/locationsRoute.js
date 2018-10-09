// Routes of locations.
const express = require('express');
const {
  locationsController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  .get('/', locationsController.showAll)
  .get('/:id', middlewaresErr.errMid.paramsValid, locationsController.showOne)
  .post('/', [middlewaresErr.errMid.lattLongValid,
    middlewaresErr.errMid.streetValid,
    middlewaresErr.errMid.numLocationsValid,
    middlewaresErr.errMid.decimalLocationValid,
    // middlewaresErr.errMid.activeValid,
    middlewaresErr.errMid.roomValid,
    // middlewaresErr.errMid.availableRoomValid,
  ], locationsController.create)
  .put('/:id', middlewaresErr.errMid.paramsValid, locationsController.update)
  .patch('/:id', middlewaresErr.errMid.paramsValid, locationsController.patch)
  .delete('/:id', middlewaresErr.errMid.paramsValid, locationsController.remove);

module.exports = route;
