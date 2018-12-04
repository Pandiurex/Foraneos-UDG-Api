const { LivesIn } = require('../models');

/**
 * Gets all the livesIn related to the locationId in req.params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends all the relations
 */
exports.showAll = async (req, res, next) => {
  const result = await LivesIn.getAll('', req.params.locationId);

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
 * Creates a livesIn with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the livesIn created
 */
exports.create = async (req, res, next) => {
  const result = await LivesIn.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Location doesn\'t have suficcient Rooms',
    });
  } else {
    res.status(201).send(result);
  }
};

/**
 * Updates all the editable datas form a livesIn with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the livesIn updated
 */
exports.update = async (req, res, next) => {
  const result = await LivesIn.update(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else {
    res.send(result);
  }
};

/**
 * Updates one of the editable datas form a livesIn with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined         Sends error if it happens otherwise sends the data updated
 */
exports.patch = async (req, res, next) => {
  const result = await LivesIn.patch(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Patch only receive one attribute',
    });
  } else {
    res.send(result);
  }
};
