const { Location } = require('../models');

/**
 * Gets all the locations with the specified filters
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends all the locations
 */
exports.showAll = async (req, res, next) => {
  const { orderBy } = req.query;
  const { orderSense } = req.query;
  const { limitOffset } = req.query;
  const { limitCount } = req.query;

  const result = await Location.getAll(orderBy,
    orderSense, limitOffset, limitCount);

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
 * Gets a location with the id in req.params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the location specified
 */
exports.showOne = async (req, res, next) => {
  const result = await Location.get(req.params.id);

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
 * Creates a location with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the location created
 */
exports.create = async (req, res, next) => {
  const result = await Location.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else if (result === 1) {
    next({
      status: 404,
      message: 'Service not found',
    });
  } else {
    res.status(201).send(result);
  }
};

/**
 * Updates all the editable datas from a location with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the location updated
 */
exports.update = async (req, res, next) => {
  const result = await Location.update(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 2) {
    next({
      status: 409,
      message: 'Doesn\'t can reduce more the num of rooms',
    });
  } else {
    res.send(result);
  }
};

/**
 * Updates one of the editable datas from a location with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the data updated
 */
exports.patch = async (req, res, next) => {
  const result = await Location.patch(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Doesn\'t can reduce more the num of rooms',
    });
  } else {
    res.send(result);
  }
};

/**
 * Removes a location logically with the id in req.params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the location removed
 */
exports.remove = async (req, res, next) => {
  const result = await Location.remove(req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Doesn\'t can delete a location with rooms in use',
    });
  } else {
    res.send(result);
  }
};
