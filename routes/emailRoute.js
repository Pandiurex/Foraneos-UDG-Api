// Routes of email.
const express = require('express');
const {
  emailController,
} = require('../controllers');

const route = express.Router();

route
  .post('/', emailController.create)
  .delete('/:id', emailController.remove);

module.exports = route;
