// Routes of evaluations.
const express = require('express');
const { evaluationsController } = require('../Controllers');

const route = express.Router();
const routeEvaluations = express.Router();

route
  .get('/', evaluationsController.showAll)
  .get('/:id', evaluationsController.showOne)
  .post('/', evaluationsController.create)
  .put('/:id', evaluationsController.update)
  .delete('/:id', evaluationsController.deleteOne)
  .patch('/:id', evaluationsController.patch);

routeEvaluations.use('/evaluations', route);
module.exports = routeEvaluations;
