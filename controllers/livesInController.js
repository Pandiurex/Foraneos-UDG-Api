// Controllers of Lives-In.
exports.showAll = (req, res) => {
  res.send('Show all Lives In');
};

exports.showOne = (req, res) => {
  res.send(req.params.id);
};

exports.create = (req, res) => {
  res.send(req.body);
};

exports.update = (req, res) => {
  res.send(req.body);
};

exports.remove = (req, res) => {
  res.send(req.body);
};

exports.patch = (req, res) => {
  res.send(req.body);
};
