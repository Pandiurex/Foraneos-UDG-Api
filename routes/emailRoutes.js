// Routes of messages.
const express = require('express');
const {
  emailController,
} = require('../controllers');

const route = express.Router();

route
  .get('/', emailController.showAll)
  .get('/:id', emailController.showOne)
  .post('/', emailController.create)
  .put('/:id', emailController.update)
  .delete('/:id', emailController.remove)
  .patch('/:id', emailController.patch);

module.exports = route;
