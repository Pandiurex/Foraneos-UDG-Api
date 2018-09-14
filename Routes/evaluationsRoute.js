// Routes of evaluations.
const express = require('express');
const evaluationsController = require('../Controllers/evaluationsController');

const api = express.Router();
const routerEvaluations = express.Router();

api
  .get('/', evaluationsController.showAll)
  .get('/:id', evaluationsController.showOne)
  .post('/', evaluationsController.create)
  .put('/:id', evaluationsController.update)
  .delete('/:id', evaluationsController.deleteOne);

evaluationsController.use('/evaluations', api);
module.exports = routerEvaluations;
