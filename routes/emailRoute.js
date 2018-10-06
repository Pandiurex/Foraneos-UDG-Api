// Routes of email.
const express = require('express');
const { emailController } = require('../controllers');

const route = express.Router();

route
  .post('/', emailController.create)
  .delete('/:userId([0-9]+)', emailController.remove);

module.exports = route;
