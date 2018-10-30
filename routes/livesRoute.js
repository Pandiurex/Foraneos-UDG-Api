// Routes of Lives.
const express = require('express');
const { livesController } = require('../controllers');
const middlewaresErr = require('../middlewares');
const { authMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/lives', [authMid.sessionChecker, authMid.havePermissions],
    livesController.showAll)
  .post('/:locationId/lives', [authMid.sessionChecker,
    authMid.havePermissions,
    middlewaresErr.errMid.startDateValid,
    middlewaresErr.errMid.endDateValid,
  ], livesController.create)
  .put('/:locationId/lives/:id', [authMid.sessionChecker, authMid.havePermissions],
    livesController.update)
  .patch('/:locationId/lives/:id', [authMid.sessionChecker, authMid.havePermissions],
    livesController.patch);

module.exports = route;
