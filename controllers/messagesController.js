// Controllers of messages.
exports.showAll = (req, res) => {
  res.send('Show all messages');
};

exports.showOne = (req, res) => {
  res.send(req.params.id);
};

exports.create = (req, res) => {
  res.send(req.body);
};
