const {
  location,
} = require('../models');

exports.showAll = async (req, res) => {
  let result = await location.getAll();

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
  let result = await location.get(req.params.id);

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
  let result = await location.create(req.body);

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
        status: 404,
        message: 'Service not found',
      },
    };
    res.status(404);
  } else {
    res.status(201);
  }

  res.send(result);
};

exports.update = async (req, res) => {
  let result = await location.update(req.params.id, req.body);

  if (result === 0) {
    result = {
      error: {
        status: 404,
        message: 'Resource not found',
      },
    };
    res.status(404);
  } else if (result === 1) {
    result = {
      error: {
        status: 409,
        message: 'Error updating resource',
      },
    };
    res.status(409);
  } else if (result === 2) {
    result = {
      error: {
        status: 409,
        message: 'Doesn\'t can reduce more the num of rooms',
      },
    };
    res.status(409);
  }

  res.send(result);
};

exports.patch = async (req, res) => {
  let result = await location.patch(req.params.id, req.body);

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Error updating resource',
      },
    };
    res.status(409);
  } else if (result === 1) {
    result = {
      error: {
        status: 409,
        message: 'Doesn\'t can reduce more the num of rooms',
      },
    };
    res.status(409);
  }

  res.send(result);
};

exports.remove = async (req, res) => {
  let result = await location.remove(req.params.id);

  if (result === 0) {
    result = {
      error: {
        status: 404,
        message: 'Resource not found',
      },
    };
    res.status(404);
  } else if (result === 1) {
    result = {
      error: {
        status: 409,
        message: 'Doesn\'t can delete a location with rooms in use',
      },
    };
    res.status(404);
  }

  res.send(result);
};
