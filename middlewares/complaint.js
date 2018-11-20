const { getCompare } = require('./general');

const checkUserId = (req, res, next) => {
  console.log('User id');

  if (getCompare.number.test(req.body.userId) === false) {
    const result = {
      error: {
        status: 406,
        message: 'Invalid format in userId',
      },
    };
    res.status(406).send(result);
  } else {
    console.log('next User id');
    next();
  }
};

const checkLocationId = (req, res, next) => {
  console.log('Location id');
  if (getCompare.number.test(req.body.locationId) === false) {
    const result = {
      error: {
        status: 406,
        message: 'Invalid format in locationId',
      },
    };
    res.status(406).send(result);
  } else {
    next();
  }
};

const checkComplaintTypeId = (req, res, next) => {
  console.log('Complaint Type id');
  if (getCompare.number.test(req.body.complaintTypeId) === false) {
    const result = {
      error: {
        status: 406,
        message: 'Invalid format in complaintTypeId',
      },
    };
    res.status(406).send(result);
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
