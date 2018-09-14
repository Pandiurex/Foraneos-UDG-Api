// Controllers of evaluations.
const showAll = (req, res) => res.send('Dame todas las evaluaciones').status(200);
const showOne = (req, res) => res.send('Dame una evaluacion').status(200);
const create = (req, res) => res.send('Crea un recurso nuevo').status(201);
const update = (req, res) => res.send('Modifica un recurso existente').status(200);
const deleteOne = (req, res) => res.send('Elimina un recurso').status(204);

// Submit controllers.
module.exports = {
  showAll,
  showOne,
  create,
  update,
  deleteOne,
};
