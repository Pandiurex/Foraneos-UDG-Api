// Routes of users.
const express = require('express');
const {
  usersController,
} = require('../Controllers');
const middlewaresErr = require('../Middlewares');

const route = express.Router();

route
// Login users.
  .post('/login', usersController.login)
  .get('/signOff', usersController.signOff)
// Users.
  .get('/', usersController.showAll)
  .get('/:id', usersController.showOne)
  .post('/', [middlewaresErr.errMid.emailValid, middlewaresErr.errMid.passwordValid], usersController.create)
  .put('/:id', usersController.update)
  .delete('/:id', usersController.deleteOne)
  .patch('/:id', usersController.patch);

module.exports = route;
