// Controllers of users.
const showAll = (req, res) => res.send('Show all users').status(200);
const showOne = (req, res) => res.send('Show one user').status(200);
const create = (req, res) => res.send('Create user').status(201);
const update = (req, res) => res.send('Update user').status(200);
const deleteOne = (req, res) => res.send('Delete user').status(204);
const patch = (req, res) => res.send('Update a resource user').status(200);

// Submit controllers.
module.exports = {
  showAll,
  showOne,
  create,
  update,
  deleteOne,
  patch,
};
