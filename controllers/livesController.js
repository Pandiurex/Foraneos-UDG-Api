const {
  livesIn,
} = require('../models');

exports.showAll = async (req, res) => {
  let result = await livesIn.getAll(req.params.locationId);

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
  let result = await livesIn.create(req.body);

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Conflict creating resource',
      },
    };
    res.status(409);
  } else if (result === 1) {
    result = {
      error: {
        status: 409,
        message: 'Location doesn\'t have suficcient Rooms',
      },
    };
    res.status(409);
  } else {
    res.status(201);
  }

  res.send(result);
};

exports.update = async (req, res) => {
  let result = await livesIn.update(req.params.id, req.body);

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Error updating resource',
      },
    };
    res.status(409);
  }

  res.send(result);
};

exports.patch = async (req, res) => {
  let result = await livesIn.patch(req.params.id, req.body);

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Error updating resource',
      },
    };
    res.status(409);
  }

  res.send(result);
}
