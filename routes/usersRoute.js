// Routes of users.
const express = require('express');
const {
  usersController,
} = require('../controllers');
const { errMid, authMid } = require('../middlewares');

const route = express.Router();

route
  // Users.
  .get('/', usersController.showAll)
  .get('/:id', errMid.paramsValid, usersController.showOne)
  .post('/', [errMid.nameValid,
    errMid.passwordValid,
    errMid.birthDateValid,
    errMid.userTypeValid,
    errMid.genderValid,
    errMid.emailValid,
    errMid.surnameValid,
    errMid.hashPassword,
    usersController.create,
  ], authMid.register)
  .put('/:id', errMid.paramsValid, usersController.update)
  .patch('/:id', errMid.paramsValid, usersController.patch)
  .delete('/:id', errMid.paramsValid, usersController.remove);

module.exports = route;
