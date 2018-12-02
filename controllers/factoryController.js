const Factory = require('../factory');


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
