// Routes of tokens.
const express = require('express');

const route = express.Router();

route
  // Token nuevo usuario.
  .post('/createUser')
  .get('/createUser')
  // Token recuperar cuenta.
  .post('/recoveryUser')
  .get('/recoveryUser')
  // Token iniciar sesión.
  .post('/logInUser')
  .get('/singOffUser');
