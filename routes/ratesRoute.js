const express = require('express');
const { ratesController } = require('../controllers');
const { authMid, rateMid, generalMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/rates', [generalMid.checkParamLocationId,
    authMid.sessionChecker,
    authMid.havePermissions],
  ratesController.showAll)
  .get('/:locationId/rates/:id', [generalMid.checkParamLocationId,
    generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions],
  ratesController.showOne)
  .post('/rates', [authMid.sessionChecker,
    authMid.havePermissions,
    rateMid.checkAllPost],
  ratesController.create)
  .delete('/rates/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions],
  ratesController.remove);

module.exports = route;
