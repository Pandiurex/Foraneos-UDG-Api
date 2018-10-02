const {
  locations,
} = require('../models');

exports.showAll = async (req, res) => {
  const result = await locations.getAll();
  res.send(result);
};

exports.showOne = async (req, res) => {
  const result = await locations.get(req.params.id);
  res.send(result).status(200);
};

exports.create = async (req, res) => {
  const result = await locations.create(req.body);
  res.send(result).status(201);
};

exports.update = (req, res) => {
  res.send(req.body);
};

exports.remove = (req, res) => {
  res.send(req.body);
};

exports.patch = (req, res) => {
  res.send(req.body);
};
