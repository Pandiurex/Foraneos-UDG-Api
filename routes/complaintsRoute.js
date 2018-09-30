// Routes of complaint.
const express = require('express');
const {
  complaintsRoutes,
} = require('../controllers');

const route = express.Router();

route
  .get('/', complaintsRoutes.showAll)
  .get('/:id', complaintsRoutes.showOne)
  .post('/', complaintsRoutes.create)
  .put('/:id', complaintsRoutes.update)
  .delete('/:id', complaintsRoutes.remove)
  .patch('/:id', complaintsRoutes.patch);

module.exports = route;
