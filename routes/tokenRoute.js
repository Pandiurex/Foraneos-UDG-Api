// Routes of tokens.
const express = require('express');
const { errMid, auth } = require('../middlewares');

const route = express.Router();

route.post('/login', [errMid], auth.login);

module.exports = route;
