const { Complaint } = require('../models');

/**
 * Gets all the complaints form a location with locationId in req.params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens otherwise sends all the complaints
 */
exports.showAll = async (req, res, next) => {
  const result = await Complaint.getAll(req.params.locationId);

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
 * Creates a complaint with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined         Sends error if it happens otherwise sends the complaint created
 */
exports.create = async (req, res, next) => {
  const result = await Complaint.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else {
    res.status(201).send(result);
  }
};

/**
 * Removes a complaint with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined         Sends error if it happens otherwise sends the complaint removed
 */
exports.remove = async (req, res, next) => {
  const result = await Complaint.remove(req.body);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};
