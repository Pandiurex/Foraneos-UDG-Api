const { Service } = require('../models');

exports.showAll = async (req, res, next) => {
  const result = await Service.getAll();

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};
