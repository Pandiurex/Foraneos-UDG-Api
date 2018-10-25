// Routes of tokens.
const express = require('express');
const { authMid } = require('../middlewares');

const route = express.Router();

route.get('/login', authMid.login);

module.exports = route;
