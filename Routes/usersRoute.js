// Routes of users.
const express = require('express');
const { usersController } = require('../Controllers');
const middlewares = require('../Middlewares');

const route = express.Router();

route
  // Login users.
  .post('/login', usersController.login)
  .get('/signOff', usersController.signOff)
  // Users.
  .get('/', usersController.showAll)
  .get('/:id', middlewares.idValid, usersController.showOne)
  .post('/', middlewares.nameValid, middlewares.emailValid, middlewares.passwordValid, usersController.create)
  .put('/:id', usersController.update)
  .delete('/:id', usersController.deleteOne)
  .patch('/:id', usersController.patch);

module.exports = route;
