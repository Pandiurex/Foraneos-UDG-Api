// Routes of images.
const express = require('express');
const {
  imagesRoute,
} = require('../controllers');

const route = express.Router();

route
  .get('/', imagesRoute.showAll)
  .get('/:id', imagesRoute.showOne)
  .post('/', imagesRoute.create)
  .put('/:id', imagesRoute.update)
  .delete('/:id', imagesRoute.remove)
  .patch('/:id', imagesRoute.patch);

module.exports = route;
