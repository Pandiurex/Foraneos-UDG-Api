const { getCompare } = require('./general');

const checkNum = (req, res, next) => {
  if (getCompare.number.test(req.query.num) === false) {
    next({
      status: 406,
      message: 'Invalid format in num',
    });
  } else {
    next();
  }
};

const checkAll = [
  checkNum,
];

module.exports = {
  checkNum,
  checkAll,
};
