const express = require('express');
const {
  authMid,
  userMid,
  fileMid,
} = require('../middlewares');

const route = express.Router();

route
  .get('/', [userMid.checkProfileImageName,
    authMid.sessionChecker,
    authMid.havePermissions],
  fileMid.getImage);

module.exports = route;
