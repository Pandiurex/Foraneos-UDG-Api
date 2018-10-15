// Routes of tokens.
const express = require('express');
const { tokenController } = require('../middlewares');

const route = express.Router();

route
  // Token nuevo usuario.
  .post('/createUser', tokenController.register)
  .get('/createUser')
  // Token recuperar cuenta.
  .post('/recoveryUser')
  .get('/recoveryUser')
  // Token iniciar sesión.
  .post('/logInUser')
  .get('/singOffUser');

module.exports = route;
