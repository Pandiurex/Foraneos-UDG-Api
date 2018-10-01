// Routes of complaint.
const express = require('express');
const {
  complaintsController,
} = require('../controllers');

const route = express.Router();

route
  .get('/', complaintsController.showAll)
  .get('/:id', complaintsController.showOne)
  .post('/', complaintsController.create)
  .put('/:id', complaintsController.update)
  .delete('/:id', complaintsController.remove)
  .patch('/:id', complaintsController.patch);

module.exports = route;
