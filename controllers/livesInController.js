const { LivesIn } = require('../models');

exports.showAll = async (req, res, next) => {
  const result = await LivesIn.getAll(req.params.userId);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};
