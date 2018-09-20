// Routes of users.
const express = require('express');
const { usersController } = require('../Controllers');
const middlewares = require('../Middlewares/login');

const route = express.Router();
const routeUsers = express.Router();

route
  .get('/', middlewares.checkLogin, usersController.showAll)
  .get('/:id', usersController.showOne)
  .post('/', usersController.create)
  .put('/:id', usersController.update)
  .delete('/:id', usersController.deleteOne)
  .patch('/:id', usersController.patch);

routeUsers.use('/users', route);
module.exports = routeUsers;
