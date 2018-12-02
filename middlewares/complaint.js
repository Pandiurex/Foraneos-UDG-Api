const { getCompare } = require('./general');

const checkUserId = (req, res, next) => {
  if (getCompare.number.test(req.body.userId) === false) {
    next({
      status: 406,
      message: 'Invalid format in userId',
    });
  } else {
    next();
  }
};

const checkLocationId = (req, res, next) => {
  if (getCompare.number.test(req.body.locationId) === false) {
    next({
      status: 406,
      message: 'Invalid format in locationId',
    });
  } else {
    next();
  }
};

const checkComplaintTypeId = (req, res, next) => {
  if (getCompare.number.test(req.body.complaintTypeId) === false) {
    next({
      status: 406,
      message: 'Invalid format in complaintTypeId',
    });
  } else {
    next();
  }
};

const checkAll = [
  checkUserId,
  checkLocationId,
  checkComplaintTypeId,
];

module.exports = {
  checkUserId,
  checkLocationId,
  checkComplaintTypeId,
  checkAll,
};
