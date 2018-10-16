const {
  livesIn,
} = require('../models');

// FIXME Todas las funciones deben estar documentadas
// FIXME Los objetos de error podrian estar generados a traves de codigos y armados para solo ser usados como constantes

exports.showAll = async (req, res) => {
  let result = await livesIn.getAll(req.params.userId);

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
