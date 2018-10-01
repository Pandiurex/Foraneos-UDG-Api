// Routes of emails.
const express = require('express');
const {
  emailsController,
} = require('../controllers');

const route = express.Router();

route
  .get('/', emailsController.showAll)
  .get('/:id', emailsController.showOne)
  .post('/', emailsController.create)
  .put('/:id', emailsController.update)
  .delete('/:id', emailsController.remove)
  .patch('/:id', emailsController.patch);

module.exports = route;
