const { LocationImage } = require('../models');

exports.create = async (req, res, next) => {
  const result = await LocationImage.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else {
    next();
  }
};

exports.remove = async (req, res, next) => {
  const result = await LocationImage.remove(req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.locals.path = result.image;
    next();
  }
};
