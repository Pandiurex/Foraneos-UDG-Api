const {
  complaintTypes,
} = require('../models');

exports.showAll = async (req, res) => {
  const result = await complaintTypes.getAll();

  if (result === '') {
    res.status(204);
  }

  res.send(result);
};
