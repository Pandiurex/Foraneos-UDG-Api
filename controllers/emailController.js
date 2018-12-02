const { Email } = require('../models');

exports.create = async (req, res, next) => {
  const result = await Email.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else {
    res.locals.email = result;
    next();
  }
};

exports.remove = async (req, res, next) => {
  const result = await Email.remove(req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Error deleting resource',
    });
  } else {
    res.send(result);
  }
};
