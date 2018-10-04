const factory = require('../factory');

// Controller of factory.
exports.fillUpDB = async (req, res) => {
  const result = await factory.fillUpDB(req.query.num);

  if (result === 0) {
    res.send('Error filling up the database').status(202);
  }

  res.send(`${result} tables filled up with ${req.query.num} elements`).status(201);
};
