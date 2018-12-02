// exports.errMid = require('./errMid');
exports.authMid = require('./auth');
exports.complaintMid = require('./complaint');
exports.emailMid = require('./email');
exports.factoryMid = require('./factory');
exports.livesMid = require('./lives');
exports.locationMid = require('./location');
exports.locationImageMid = require('./locationImage');
exports.locationServiceMid = require('./locationService');
exports.messageMid = require('./message');
exports.rateMid = require('./rate');
exports.userMid = require('./user');
exports.fileMid = require('./file');
exports.generalMid = require('./general');


exports.errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).send({ error: err });
  }
  next();
};
