// Routes of tokens.
const express = require('express');
const { errMid, authMid } = require('../middlewares');

const route = express.Router();

route.post('/confirmEmail', [authMid.sessionChecker, authMid.havePermissions],
  authMid.confirmEmail)
  .post('/login', [authMid.sessionChecker, authMid.havePermissions], authMid.login)
  .delete('/logout', [authMid.sessionChecker, authMid.havePermissions], [authMid.sessionChecker],
    authMid.logout)
  .get('/reqPasswordRecovery', authMid.reqPassRecovery)
  .post('/passwordRecovery', [errMid.hashPassword], authMid.passRecovery);

module.exports = route;
