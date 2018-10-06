const {
  location,
} = require('../models');

exports.showAll = async (req, res) => {
  const result = await location.getAll();
  res.send(result);
};

exports.showOne = async (req, res) => {
  const result = await location.get(req.params.locationId);
  res.send(result).status(200);
};

exports.create = async (req, res) => {
  const result = await location.create(req.body);
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
