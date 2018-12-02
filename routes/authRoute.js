const express = require('express');
const { authMid, userMid } = require('../middlewares');

const route = express.Router();

route.get('/confirmEmail', [authMid.sessionChecker,
  authMid.havePermissions,
  userMid.checkQueryEmailId],
authMid.confirmEmail)
  .post('/login', [authMid.sessionChecker,
    authMid.havePermissions,
    userMid.checkEmail,
    userMid.checkPassword],
  authMid.login)
  .delete('/logout', [authMid.sessionChecker,
    authMid.havePermissions],
  authMid.logout)
  .get('/reqPasswordRecovery', [userMid.checkQueryEmail],
    authMid.reqPassRecovery)
  .post('/passwordRecovery', [userMid.checkPassword],
    authMid.passRecovery);

module.exports = route;
