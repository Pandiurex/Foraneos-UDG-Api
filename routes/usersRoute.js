// Routes of users.
const express = require('express');
const {
  usersController,
} = require('../controllers');
const middlewaresErr = require('../middlewares');

const route = express.Router();

route
  // Login users.
  .post('/login', usersController.login)
  .get('/signoff', usersController.signOff)
  // Users.
  .get('/', usersController.showAll)
  .get('/:userId([0-9]+)', usersController.showOne)
  .post('/', [middlewaresErr.errMid.nameValid, middlewaresErr.errMid.passwordValid, middlewaresErr.errMid.birthDateValid], usersController.create)
  .put('/:userId([0-9]+)', usersController.update)
  .patch('/:userId([0-9]+)', usersController.patch)
  .delete('/:userId([0-9]+)', usersController.remove);

module.exports = route;
