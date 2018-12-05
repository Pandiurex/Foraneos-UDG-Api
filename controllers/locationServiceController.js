const { LocationService } = require('../models');

/**
 * Creates a locationService with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the locationService created
 */
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


/**
 * Removes a locationService with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the locationService removed
 */
exports.remove = async (req, res, next) => {
  const result = await LocationService.remove(req.body);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};
