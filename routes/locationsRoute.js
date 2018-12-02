const express = require('express');
const { locationsController } = require('../controllers');
const { authMid, locationMid, generalMid } = require('../middlewares');

const route = express.Router();

route
  .get('/', [authMid.sessionChecker,
    authMid.havePermissions,
    locationMid.checkAllGetAll],
  locationsController.showAll)
  .get('/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions],
  locationsController.showOne)
  .post('/', [authMid.sessionChecker,
    authMid.havePermissions,
    locationMid.checkAllPost,
  ], locationsController.create)
  .put('/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions,
    locationMid.checkAllPut],
  locationsController.update)
  .patch('/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions,
    locationMid.checkAllPatch],
  locationsController.patch)
  .delete('/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions],
  locationsController.remove);

module.exports = route;
