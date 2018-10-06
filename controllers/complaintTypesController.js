const {
  complaintType,
} = require('../models');

exports.showAll = async (req, res) => {
  const result = await complaintType.getAll();

  if (result === '') {
    res.status(204);
  }

  res.send(result);
};
