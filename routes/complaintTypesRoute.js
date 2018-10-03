// Routes of complaintTypes.
const express = require('express');
const { complaintTypesController } = require('../controllers');

const route = express.Router();
route.get('/', complaintTypesController.showAll);

module.exports = route;
