const express = require('express');
const { complaintsController } = require('../controllers');
const { authMid, complaintMid, generalMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/complaints', [generalMid.checkParamLocationId,
    authMid.sessionChecker,
    authMid.havePermissions],
  complaintsController.showAll)
  .post('/complaints', [authMid.sessionChecker,
    authMid.havePermissions,
    complaintMid.checkAll],
  complaintsController.create)
  .delete('/complaints/:id', [generalMid.checkParamId,
    authMid.sessionChecker,
    authMid.havePermissions],
  complaintsController.remove);

module.exports = route;
