const {
  rate,
} = require('../models');

// FIXME Todas las funciones deben estar documentadas
// FIXME Los objetos de error podrian estar generados a traves de codigos y armados para solo ser usados como constantes

exports.showAll = async (req, res) => {
  let result = await rate.getAll(req.params.locationId);

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
  let result = await rate.get(req.params.id);

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
  let result = await rate.create(req.body);

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
  let result = await rate.remove(req.params.id);

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
        message: 'Conflict deleting resource',
      },
    };
    res.status(409);
  }

  res.send(result);
};
