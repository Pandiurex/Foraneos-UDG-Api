const { LivesIn } = require('../models');

exports.showAll = async (req, res, next) => {
  const result = await LivesIn.getAll('', req.params.locationId);

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
  const result = await LivesIn.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Location doesn\'t have suficcient Rooms',
    });
  } else {
    res.status(201).send(result);
  }
};

exports.update = async (req, res, next) => {
  const result = await LivesIn.update(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else {
    res.send(result);
  }
};

exports.patch = async (req, res, next) => {
  const result = await LivesIn.patch(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Patch only receive one attribute',
    });
  } else {
    res.send(result);
  }
};
