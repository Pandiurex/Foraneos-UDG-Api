const { Complaint } = require('../models');

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
