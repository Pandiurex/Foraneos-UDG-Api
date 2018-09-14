// Routes of users.
const express = require('express');
const usersController = require('../Controllers/usersController');

const api = express.Router();
const routerUsers = express.Router();

api
  .get('/', usersController.showAll)
  .get('/:id', usersController.showOne)
  .post('/', usersController.create)
  .put('/:id', usersController.update)
  .delete('/:id', usersController.deleteOne);

routerUsers.use('/users', api);
module.exports = routerUsers;
