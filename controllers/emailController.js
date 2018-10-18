const {
  email,
} = require('../models');

// FIXME Todas las funciones deben estar documentadas
// FIXME Los objetos de error podrian estar generados a traves de codigos y armados para solo ser usados como constantes

exports.create = async (req, res) => {
  let result = await email.create(req.body);

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

exports.remove = async (req, res) => {
  let result = await email.remove(req.params.id);

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
        message: 'Error deleting resource',
      },
    };
    res.status(409);
  }

  res.send(result);
};
