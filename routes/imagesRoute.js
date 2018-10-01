// Routes of images.
const express = require('express');
const {
  imagesController,
} = require('../controllers');

const route = express.Router();

route
  .get('/', imagesController.showAll)
  .get('/:id', imagesController.showOne)
  .post('/', imagesController.create)
  .put('/:id', imagesController.update)
  .delete('/:id', imagesController.remove)
  .patch('/:id', imagesController.patch);

module.exports = route;
