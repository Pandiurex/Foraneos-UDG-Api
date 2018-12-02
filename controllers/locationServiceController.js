const { LocationService } = require('../models');

exports.create = async (req, res, next) => {
  const result = await LocationService.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Service already exists',
    });
  } else {
    res.status(201).send(result);
  }
};

exports.remove = async (req, res, next) => {
  const result = await LocationService.remove(req.params.locationId,
    req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};
