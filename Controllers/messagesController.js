// Controllers of messages.
const showAll = (req, res) => res.send('Show all messages').status(200);
const showOne = (req, res) => res.send('Show one message').status(200);
const create = (req, res) => res.send('Create message').status(201);
const update = (req, res) => res.send('Update message').status(200);
const deleteOne = (req, res) => res.send('Delete message').status(204);
const patch = (req, res) => res.send('Update a resource message').status(200);

module.exports = {
  showAll,
  showOne,
  create,
  update,
  deleteOne,
  patch,
};
