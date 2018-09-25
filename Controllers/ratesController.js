// Controllers of rates.
const showAll = (req, res) => res.send('Show all rates').status(200);
const showOne = (req, res) => res.send('Show one rate').status(200);
const create = (req, res) => res.send('Create rate').status(201);
const update = (req, res) => res.send('Update rate').status(200);
const deleteOne = (req, res) => res.send('Delete rate').status(204);
const patch = (req, res) => res.send('Update a resource rate').status(200);

// Submit controllers.
module.exports = {
  showAll,
  showOne,
  create,
  update,
  deleteOne,
  patch,
};
