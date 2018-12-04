const { LocationImage } = require('../models');

/**
 * Creates a locationImage with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined         Sends error if it happens otherwise sends the locationImage created
 */
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

/**
 * Removes a locationImage with the req.params.id
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined         Sends error if it happens otherwise sends the complaint removed
 */
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
