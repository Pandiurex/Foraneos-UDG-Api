const express = require('express');
const { locationServiceController } = require('../controllers');
const { authMid, locationServiceMid, fileMid } = require('../middlewares');

const route = express.Router();

route
  .post('/', [authMid.sessionChecker,
    authMid.havePermissions,
    locationServiceMid.checkAll],
  locationServiceController.create)
  .delete('/', [authMid.sessionChecker,
    authMid.havePermissions,
    locationServiceMid.checkAll],
  locationServiceController.remove)
  .get('/', [locationServiceMid.checkImageName,
    authMid.sessionChecker,
    authMid.havePermissions],
  fileMid.getImage);


module.exports = route;
