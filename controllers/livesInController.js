const { LivesIn } = require('../models');

/**
 * Gets all the livesIn related to the userId in req.params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends all the relations
 */
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
