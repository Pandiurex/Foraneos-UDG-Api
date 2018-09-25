// Controllers of locations.
const showAll = (req, res) => res.send('Show all locations').status(200);
const showOne = (req, res) => res.send('Show one location').status(200);
const create = (req, res) => res.send('Create location').status(201);
const update = (req, res) => res.send('Updtate location').status(200);
const deleteOne = (req, res) => res.send('Delete location').status(204);
const patch = (req, res) => res.send('Update a resource location').status(200);

// Submit controllers.
module.exports = {
  showAll,
  showOne,
  create,
  update,
  deleteOne,
  patch,
};
