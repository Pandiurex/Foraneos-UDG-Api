exports.errMid = require('./errMid');
exports.authMid = require('./auth');

exports.errorHandler = (err, req, res, next) => {
  console.log('Error handler');
  if (err) {
    res.status(err.status || 500).send(err);
  }
};
