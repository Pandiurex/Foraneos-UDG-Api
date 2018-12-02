const { Rate } = require('../models');

exports.showAll = async (req, res, next) => {
  const result = await Rate.getAll(req.params.locationId);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};

exports.showOne = async (req, res, next) => {
  const result = await Rate.get(req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};

exports.create = async (req, res, next) => {
  const result = await Rate.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else {
    res.status(201).send(result);
  }
};

exports.remove = async (req, res, next) => {
  const result = await Rate.remove(req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Conflict deleting resource',
    });
  } else {
    res.send(result);
  }
};
