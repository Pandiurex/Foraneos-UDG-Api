const {
  rates,
} = require('../models');

exports.showAll = async (req, res) => {
  const result = await rates.getAll(req.params.locationId);

  if (result.length === 0) {
    res.status(204);
  }

  res.send(result);
};

exports.showOne = (req, res) => {
  res.send(req.params.id);
};

exports.create = (req, res) => {
  res.send(req.body);
};

exports.remove = (req, res) => {
  res.send(req.body);
};
