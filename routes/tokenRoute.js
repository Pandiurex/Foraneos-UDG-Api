// Routes of tokens.
const express = require('express');
const { usersController } = require('../controllers');
const middlewaresAuth = require('../middlewares');

const route = express.Router();

route
  // Token nuevo usuario.
  .post('/createUser', middlewaresAuth.Auth.register, usersController.create)
  .get('/createUser')
  // Token recuperar cuenta.
  .post('/recoveryUser')
  .get('/recoveryUser')
  // Token iniciar sesión.
  .post('/logInUser', middlewaresAuth.Auth.login)
  .get('/singOffUser');

module.exports = route;
