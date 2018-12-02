// Routes of email.
const express = require('express');
const { emailController } = require('../controllers');
const { authMid, emailMid, generalMid } = require('../middlewares');

const route = express.Router();

route
  .post('/', [authMid.sessionChecker,
    authMid.havePermissions,
    emailMid.checkAll,
    emailController.create],
  authMid.reqConfirmEmail)
  .delete('/:id', [generalMid.checkParamId],
    emailController.remove);

module.exports = route;
