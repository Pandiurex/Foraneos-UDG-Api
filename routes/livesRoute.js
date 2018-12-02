const express = require('express');
const { livesController } = require('../controllers');
const { authMid, livesMid, generalMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/lives', [generalMid.checkParamLocationId,
    authMid.sessionChecker,
    authMid.havePermissions],
  livesController.showAll)
  .post('/lives', [authMid.sessionChecker,
    authMid.havePermissions,
    livesMid.checkAllPost],
  livesController.create)
  .put('/lives/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions,
    livesMid.checkAllPut],
  livesController.update)
  .patch('/lives/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions,
    livesMid.checkAllPatch],
  livesController.patch);

module.exports = route;
