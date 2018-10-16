// Routes of email.
const express = require('express');
const {
  emailController,
} = require('../controllers');

const route = express.Router();

route
// FIXME Falta validar cuerpo del request
  .post('/', emailController.create)
  // FIXME Falta validar param :id
  .delete('/:id', emailController.remove);

module.exports = route;
