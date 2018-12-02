const { getCompare } = require('./general');

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

const checkServiceId = (req, res, next) => {
  if (getCompare.number.test(req.body.serviceId) === false) {
    next({
      status: 406,
      message: 'Invalid format in serviceId',
    });
  } else {
    next();
  }
};

const checkImageName = (req, res, next) => {
  if (getCompare.serviceImage.test(req.query.image) === false) {
    next({
      status: 406,
      message: 'Invalid format in image',
    });
  } else {
    next();
  }
};

const checkAll = [
  checkLocationId,
  checkServiceId,
];

module.exports = {
  checkLocationId,
  checkServiceId,
  checkImageName,
  checkAll,
};
