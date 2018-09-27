// Routes of messages.
const express = require('express');
const { messagesController } = require('../controllers');

const route = express.Router();

route
  .get('/', messagesController.showAll)
  .get('/:id', messagesController.showOne)
  .post('/', messagesController.create)
  .put('/:id', messagesController.update)
  .delete('/:id', messagesController.remove)
  .patch('/:id', messagesController.patch);

module.exports = route;
