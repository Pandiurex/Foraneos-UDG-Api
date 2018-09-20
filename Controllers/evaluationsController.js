// Controllers of evaluations.
const showAll = (req, res) => res.send('Show all evaluations').status(200);
const showOne = (req, res) => res.send('Show one evaluation').status(200);
const create = (req, res) => res.send('Create evaluation').status(201);
const update = (req, res) => res.send('Update evaluation').status(200);
const deleteOne = (req, res) => res.send('Delete evaluation').status(204);
const patch = (req, res) => res.send('Update a resource evaluation').status(200);

// Submit controllers.
module.exports = {
  showAll,
  showOne,
  create,
  update,
  deleteOne,
  patch,
};
