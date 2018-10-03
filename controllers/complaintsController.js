// Controllers of complaint.
exports.showAll = (req, res) => {
  res.send('Show all Complaints');
};

exports.create = (req, res) => {
  res.send(req.body);
};

exports.remove = (req, res) => {
  res.send(req.body);
};
