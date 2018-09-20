// Routes of users.
const express = require('express');
const { usersController } = require('../Controllers');

const route = express.Router();

route
  .get('/', usersController.showAll)
  .get('/:id', usersController.showOne)
  .post('/', usersController.create)
  .put('/:id', usersController.update)
  .delete('/:id', usersController.deleteOne)
  .patch('/:id', usersController.patch);

module.exports = route;
