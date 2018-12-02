const { Location } = require('../models');

exports.showAll = async (req, res, next) => {
  const { orderBy } = req.query;
  const { orderSense } = req.query;
  const { limitOffset } = req.query;
  const { limitCount } = req.query;

  const result = await Location.getAll(orderBy,
    orderSense, limitOffset, limitCount);

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
  const result = await Location.get(req.params.id);

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
  const result = await Location.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else if (result === 1) {
    next({
      status: 404,
      message: 'Service not found',
    });
  } else {
    res.status(201).send(result);
  }
};

exports.update = async (req, res, next) => {
  const result = await Location.update(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 2) {
    next({
      status: 409,
      message: 'Doesn\'t can reduce more the num of rooms',
    });
  } else {
    res.send(result);
  }
};

exports.patch = async (req, res, next) => {
  const result = await Location.patch(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Doesn\'t can reduce more the num of rooms',
    });
  } else {
    res.send(result);
  }
};

exports.remove = async (req, res, next) => {
  const result = await Location.remove(req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Doesn\'t can delete a location with rooms in use',
    });
  } else {
    res.send(result);
  }
};
