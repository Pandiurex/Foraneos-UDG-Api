const { Email } = require('../models');

/**
 * Creates an email with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined         Sends error if it happens, otherwise sends the email created
 */
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

/**
 * Removes an email with the id in the params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined         Sends error if it happens, otherwise sends the email removed
 */
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
