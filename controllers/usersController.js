const { User } = require('../models');

/**
 * Gets all the users
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends all the users
 */
exports.showAll = async (req, res, next) => {
  const result = await User.getAll();

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
 * Gets an user with the id in req.params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the user specified
 */
exports.showOne = async (req, res, next) => {
  const result = await User.get(req.params.id);

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
 * Creates a user with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the user created
 */
exports.create = async (req, res, next) => {
  const result = await User.create(req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Conflict creating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'Email already exists',
    });
  } else {
    res.locals.user = result;
    next();
  }
};

/**
 * Updates all the editable datas from an user with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the user updated
 */
exports.update = async (req, res, next) => {
  const result = await User.update(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'New email doesn\'t belong to the user',
    });
  } else {
    res.locals.user = result;
    next();
  }
};

/**
 * Updates one of the editable datas from an user with the req.body
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the data updated
 */
exports.patch = async (req, res, next) => {
  const result = await User.patch(req.params.id, req.body);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error updating resource',
    });
  } else if (result === 1) {
    next({
      status: 409,
      message: 'New email doesn\'t belong to the user',
    });
  } else if (result === 2) {
    next({
      status: 409,
      message: 'Patch only receive one attribute',
    });
  } else if (req.file === undefined) {
    res.send(result);
  } else {
    res.locals.user = result;
    next();
  }
};

/**
 * Removes a user logically with the id in req.params
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined        Sends error if it happens, otherwise sends the user removed
 */
exports.remove = async (req, res, next) => {
  const result = await User.remove(req.params.id);

  if (result === 0) {
    next({
      status: 404,
      message: 'Resource not found',
    });
  } else {
    res.send(result);
  }
};
