// Routes of complaint.
const express = require('express');
const {
  complaintsController,
} = require('../controllers');
const { authMid } = require('../middlewares');

const route = express.Router();

route
  .get('/:locationId/complaints', [authMid.sessionChecker, authMid.havePermissions],
    complaintsController.showAll)
  .post('/:locationId/complaints', [authMid.sessionChecker, authMid.havePermissions],
    complaintsController.create)
  .delete('/:locationId/complaints/:id', [authMid.sessionChecker, authMid.havePermissions],
    complaintsController.remove);

module.exports = route;
