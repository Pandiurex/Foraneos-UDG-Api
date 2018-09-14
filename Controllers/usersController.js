// Controllers of users.
const showAll = (req, res) => res.send('Dame todos').status(200);
const showOne = (req, res) => res.send('Dame uno').status(200);
const create = (req, res) => res.send('Crea un recurso').status(201);
const update = (req, res) => res.send('Modifica un recurso').status(200);
const deleteOne = (req, res) => res.send('Elimina un recurso').status(204);

// Submit controllers.
module.exports = {
  showAll,
  showOne,
  create,
  update,
  deleteOne,
};
