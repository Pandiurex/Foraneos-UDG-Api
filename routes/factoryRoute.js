// Route of factory
const express = require('express');
const { factoryController } = require('../controllers');

const route = express.Router();
route.post('/', factoryController.fillUpDB);

module.exports = route;
