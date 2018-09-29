// Routes of Lives-In.
const express = require('express');
const {
  livesInRoute,
} = require('../controllers');

const route = express.Router();

route
  .get('/', livesInRoute.showAll)
  .get('/:id', livesInRoute.showOne)
  .post('/', livesInRoute.create)
  .put('/:id', livesInRoute.update)
  .delete('/:id', livesInRoute.remove)
  .patch('/:id', livesInRoute.patch);

module.exports = route;
