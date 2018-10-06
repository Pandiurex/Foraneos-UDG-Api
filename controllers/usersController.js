const {
  user,
} = require('../models');

exports.showAll = async (req, res) => {
  let result = await user.getAll();

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
  let result = await user.get(req.params.userId);

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
  let result = await user.create(req.body);

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Conflict creating resource',
      },
    };
    res.status(409);
  } if (result === 1) {
    result = {
      error: {
        status: 409,
        message: 'Email already exists',
      },
    };
    res.status(409);
  } else {
    res.status(201);
  }

  res.send(result);
};

exports.update = async (req, res) => {
  let result = await user.update(req.params.userId, req.body);

  console.log('Llega');

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Error updating resource',
      },
    };
    res.status(409);
  } if (result === 1) {
    result = {
      error: {
        status: 409,
        message: 'New email doesn\'t belong to the user',
      },
    };
    res.status(409);
  }

  res.send(result);
};

exports.patch = async (req, res) => {
  let result = await user.patch(req.params.userId, req.body);

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Error updating resource',
      },
    };
    res.status(409);
  } if (result === 1) {
    result = {
      error: {
        status: 409,
        message: 'New email doesn\'t belong to the user',
      },
    };
    res.status(409);
  } if (result === 2) {
    result = {
      error: {
        status: 409,
        message: 'Patch only receive one attribute',
      },
    };
    res.status(409);
  }

  res.send(result);
};

exports.remove = async (req, res) => {
  let result = await user.remove(req.params.userId);

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

// Login users.
exports.login = (req, res) => {
  res.send('Login user').status(200);
};

exports.signOff = (req, res) => {
  res.send('Sign Off user').status(200);
};
