// Routes of email.
const express = require('express');
const {
  emailController,
} = require('../controllers');
const { authMid } = require('../middlewares');

const route = express.Router();

route
  .post('/', [authMid.sessionChecker, authMid.havePermissions, emailController.create],
    authMid.reqConfirmEmail)
  .delete('/:id', emailController.remove);

module.exports = route;
