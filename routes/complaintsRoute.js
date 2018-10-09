// Routes of complaint.
const express = require('express');
const {
  complaintsController,
} = require('../controllers');

const route = express.Router();

route
  .get('/:locationId/complaints', complaintsController.showAll)
  .post('/:locationId/complaints', complaintsController.create)
  .delete('/:locationId/complaints/:id', complaintsController.remove);

module.exports = route;
