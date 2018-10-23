// Routes of users.
const express = require('express');
const {
  usersController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  // Users.
  .get('/', usersController.showAll)
  .get('/:id', middlewaresErr.errMid.paramsValid, usersController.showOne)
  .post('/', [middlewaresErr.auth.register,
    middlewaresErr.errMid.nameValid,
    middlewaresErr.errMid.passwordValid,
    middlewaresErr.errMid.birthDateValid,
    middlewaresErr.errMid.userTypeValid,
    middlewaresErr.errMid.genderValid,
    middlewaresErr.errMid.emailValid,
    middlewaresErr.errMid.surnameValid,
  ], usersController.create)
  .put('/:id', middlewaresErr.errMid.paramsValid, usersController.update)
  .patch('/:id', middlewaresErr.errMid.paramsValid, usersController.patch)
  .delete('/:id', middlewaresErr.errMid.paramsValid, usersController.remove);

module.exports = route;
