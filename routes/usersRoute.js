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
  .get('/:userId', usersController.showOne)
  .post('/', [middlewaresErr.errMid.nameValid, middlewaresErr.errMid.passwordValid, middlewaresErr.errMid.birthDateValid], usersController.create)
  .put('/:userId', usersController.update)
  .patch('/:userId', usersController.patch)
  .delete('/:userId', usersController.remove);

module.exports = route;
