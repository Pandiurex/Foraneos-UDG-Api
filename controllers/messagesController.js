const { Message } = require('../models');

/**
 * Gets all the messages with locationId in req.params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends all the messages
 */
exports.showAll = async (req, res, next) => {
  const result = await Message.getAll(req.params.locationId);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};

/**
 * Gets a message with the id in req.params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the message specified
 */
exports.showOne = async (req, res, next) => {
  const result = await Message.get(req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};

/**
 * Creates a message with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the message created
 */
exports.create = async (req, res, next) => {
  const result = await Message.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else {
    res.status(201).send(result);
  }
};
