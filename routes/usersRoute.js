// Routes of users.
const express = require('express');
const { usersController } = require('../controllers');

const route = express.Router();

route
  // Login users.
  .post('/login', usersController.login)
  .get('/signoff', usersController.signOff)
  // Users.
  .get('/', usersController.showAll)
  .get('/:id', usersController.showOne)
  .post('/', usersController.create)
  .put('/:id', usersController.update)
  .delete('/:id', usersController.remove)
  .patch('/:id', usersController.patch);

module.exports = route;
