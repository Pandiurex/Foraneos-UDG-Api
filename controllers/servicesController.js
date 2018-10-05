const {
  service,
} = require('../models');

exports.showAll = async (req, res) => {
  const result = await service.getAll();

  if (result.length === 0) {
    res.status(204);
  }

  res.send(result);
};
