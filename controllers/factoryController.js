const Factory = require('../factory');

/**
 * Executes the factory to create the cantitiy of elements in req.query.num
 * @param  {object}   req   Request form express package
 * @param  {object}   res   Response from express package
 * @param  {Function} next  Function that continues the middlewares processing
 * @return undefined         Sends error if it happens, otherwise sends a message
 */
exports.fillUpDB = async (req, res, next) => {
  let result = await Factory.fillUpDB(req.query.num);

  if (result === 0) {
    next({
      status: 409,
      message: 'Error filling up the database',
    });
  } else {
    result = {
      factory: {
        status: 201,
        message: `${result} tables filled up with ${req.query.num} elements`,
      },
    };
    res.status(201).send(result);
  }
};
