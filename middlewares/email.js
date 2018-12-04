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

const checkEmail = (req, res, next) => {
  if (getCompare.email.test(req.body.email) === false) {
    next({
      status: 406,
      message: 'Invalid format in email',
    });
  } else {
    next();
  }
};

const checkAll = [
  checkUserId,
  checkEmail,
];

module.exports = {
  checkUserId,
  checkEmail,
  checkAll,
};
