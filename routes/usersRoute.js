// Routes of users.
const express = require('express');
const {
  usersController,
} = require('../controllers');
const { errMid, authMid } = require('../middlewares');

const route = express.Router();

route
  // Users.
  .get('/', [authMid.sessionChecker, authMid.havePermissions],
    usersController.showAll)
  .get('/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    errMid.paramsValid],
  usersController.showOne)
  .post('/', [authMid.sessionChecker,
    authMid.havePermissions,
    errMid.nameValid,
    errMid.passwordValid,
    errMid.birthDateValid,
    errMid.userTypeValid,
    errMid.genderValid,
    errMid.emailValid,
    errMid.surnameValid,
    errMid.hashPassword,
    usersController.create,
  ], authMid.register)
  .put('/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    errMid.paramsValid],
  usersController.update)
  .patch('/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    errMid.paramsValid],
  usersController.patch)
  .delete('/:id', [authMid.sessionChecker,
    authMid.havePermissions,
    errMid.paramsValid],
  usersController.remove);

module.exports = route;
