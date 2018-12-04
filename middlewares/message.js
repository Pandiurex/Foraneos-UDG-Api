const { getCompare } = require('./general');

const checkSenderUserId = (req, res, next) => {
  if (getCompare.number.test(req.body.senderUserId) === false) {
    next({
      status: 406,
      message: 'Invalid format in senderUserId',
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

const checkMessage = (req, res, next) => {
  if (req.body.message === undefined
    || req.body.message === '') {
    next({
      status: 406,
      message: 'Invalid format in message',
    });
  }

  if (getCompare.paragraph.test(req.body.message) === false) {
    next({
      status: 406,
      message: 'Invalid format in message',
    });
  } else {
    next();
  }
};

const addTime = (req, res, next) => {
  const now = new Date();

  req.body.time = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  req.body.time += ` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  next();
};

const checkAll = [
  checkSenderUserId,
  checkLocationId,
  checkMessage,
  addTime,
];

module.exports = {
  checkSenderUserId,
  checkLocationId,
  checkMessage,
  addTime,
  checkAll,
};
