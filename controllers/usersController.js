const {
  users,
} = require('../models');

exports.showAll = async (req, res) => {
  const result = await users.getAll();
  res.send(result);
};

exports.showOne = async (req, res) => {
  const result = await users.get(req.params.userId);
  res.send(result).status(200);
};

exports.create = async (req, res) => {
  const result = await users.create(req.body);
  res.send(result).status(201);
};

exports.update = async (req, res) => {
  const result = await users.update(req.params.userId, req.body);
  res.send(result).status(200);
};

exports.remove = (req, res) => {
  res.send('Delete user').status(204);
};

exports.patch = (req, res) => {
  res.send('Update a resource user').status(200);
};

// Login users.
exports.login = (req, res) => {
  res.send('Login user').status(200);
};

exports.signOff = (req, res) => {
  res.send('Sign Off user').status(200);
};
