// Routes of users.
const express = require('express');
const { usersController } = require('../Controllers');
const middlewares = require('../Middlewares/login');

const route = express.Router();

route
  // Login users.
  .post('/login', usersController.login)
  .get('/signOff', usersController.signOff)
  // Users.
  .get('/', usersController.showAll)
  .get('/:id', usersController.showOne)
  .post('/', usersController.create)
  .put('/:id', usersController.update)
  .delete('/:id', usersController.deleteOne)
  .patch('/:id', usersController.patch);

module.exports = route;
