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

const checkCommentTitle = (req, res, next) => {
  if (req.body.commentTitle === undefined) {
    next();
  } else if (getCompare.paragraph.test(req.body.commentTitle) === false) {
    next({
      status: 406,
      message: 'Invalid format in commentTitle',
    });
  } else {
    next();
  }
};

const checkComment = (req, res, next) => {
  if (req.body.comment === undefined) {
    next();
  } else if (getCompare.paragraph.test(req.body.comment) === false) {
    next({
      status: 406,
      message: 'Invalid format in comment',
    });
  } else {
    next();
  }
};

const checkRate = (req, next, name) => {
  if (getCompare.number.test(req.body[name]) === false) {
    next({
      status: 406,
      message: `Invalid format in comment ${name}`,
    });
  } else if (req.body[name] < 0
    || req.body[name] > 5) {
    next({
      status: 406,
      message: `Invalid format in comment ${name}`,
    });
  } else {
    next();
  }
};

const checkServicesRate = (req, res, next) => {
  checkRate(req, next, 'servicesRate');
};

const checkSecurityRate = (req, res, next) => {
  checkRate(req, next, 'securityRate');
};

const checkLocalizationRate = (req, res, next) => {
  checkRate(req, next, 'localizationRate');
};

const checkCostBenefictRate = (req, res, next) => {
  checkRate(req, next, 'costBenefictRate');
};

const addDate = (req, res, next) => {
  const now = new Date();

  req.body.date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  next();
};

const checkAllPost = [
  checkUserId,
  checkLocationId,
  checkCommentTitle,
  checkComment,
  checkServicesRate,
  checkSecurityRate,
  checkLocalizationRate,
  checkCostBenefictRate,
  addDate,
];

module.exports = {
  checkAllPost,
};
