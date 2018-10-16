// Routes of complaint.
const express = require('express');
const {
  complaintsController,
} = require('../controllers');

const route = express.Router();

route
// FIXME Falta validar params en todas estas rutas para :locationId y :id
  .get('/:locationId/complaints', complaintsController.showAll)
  // FIXME Falta validar cuerpo del request
  .post('/:locationId/complaints', complaintsController.create)
  .delete('/:locationId/complaints/:id', complaintsController.remove);

module.exports = route;
