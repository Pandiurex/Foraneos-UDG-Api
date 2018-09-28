const { users } = require('../models');

// Controllers of users.
/**
 * Returns every user only with his main email
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.showAll = async (req, res) => {
  const result = await users.getAll();
  res.send(result);
};

/**
 * Return an user with all his emails
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.showOne = async (req, res) => {
  const result = await users.get(req.params.id);
  res.send(result).status(200);
};

exports.create = async (req, res) => {
  const result = await users.create(req.body);
  res.send(result).status(201);
};

exports.update = async (req, res) => {
  const result = await users.update(req.params.id, req.body);
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
