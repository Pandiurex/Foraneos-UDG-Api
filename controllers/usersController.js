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
exports.showOne = (req, res) => {
  res.send('Show one user').status(200);
};

exports.create = (req, res) => {
  res.send('Create user').status(201);
};

exports.update = (req, res) => {
  res.send('Update user').status(200);
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
