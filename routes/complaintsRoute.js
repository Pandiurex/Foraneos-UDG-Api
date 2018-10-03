// Routes of complaint.
const express = require('express');
const {
  complaintsController,
} = require('../controllers');

const route = express.Router();

route
  .get('/', complaintsController.showAll)
  .post('/', complaintsController.create)
  .delete('/:userId', complaintsController.remove);

module.exports = route;
