const {
  message,
} = require('../models');

exports.showAll = async (req, res) => {
  let result = await message.getAll(req.params.locationId);

  console.log(result);

  if (result === 0) {
    result = {
      error: {
        status: 404,
        message: 'Resource not found',
      },
    };
    res.status(404);
  }

  res.send(result);
};

exports.showOne = async (req, res) => {
  let result = await message.get(req.params.id);

  if (result === 0) {
    result = {
      error: {
        status: 404,
        message: 'Resource not found',
      },
    };
    res.status(404);
  }

  res.send(result);
};

exports.create = async (req, res) => {
  let result = await message.create(req.body);

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Conflict creating resource',
      },
    };
    res.status(409);
  } else {
    res.status(201);
  }

  res.send(result);
};
