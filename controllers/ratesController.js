// Controllers of rates.
exports.showAll = (req, res) => {
  res.send('Show all rates');
};

exports.showOne = (req, res) => {
  res.send(req.params.id);
};

exports.create = (req, res) => {
  res.send(req.body);
};

exports.remove = (req, res) => {
  res.send(req.body);
};
