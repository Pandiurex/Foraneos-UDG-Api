// Routes of complaintTypes.
const express = require('express');
const { complaintTypesController } = require('../controllers');
const { authMid } = require('../middlewares');

const route = express.Router();
route.get('/', [authMid.sessionChecker, authMid.havePermissions],
  complaintTypesController.showAll);

module.exports = route;
