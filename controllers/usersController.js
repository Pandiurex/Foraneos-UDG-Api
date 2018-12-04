const { User } = require('../models');

exports.showAll = async (req, res, next) => {
  const result = await User.getAll();

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
  const result = await User.get(req.params.id);

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
  const result = await User.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Email already exists',
    });
  } else {
    res.locals.user = result;
    next();
  }
};

exports.update = async (req, res, next) => {
  const result = await User.update(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'New email doesn\'t belong to the user',
    });
  } else {
    res.locals.user = result;
    next();
  }
};

exports.patch = async (req, res, next) => {
  const result = await User.patch(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'New email doesn\'t belong to the user',
    });
  } else if (result === 2) {
    next({
      status: 409,
      message: 'Patch only receive one attribute',
    });
  } else if (req.file === undefined) {
    res.send(result);
  } else {
    res.locals.user = result;
    next();
  }
};

exports.remove = async (req, res, next) => {
  const result = await User.remove(req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};
