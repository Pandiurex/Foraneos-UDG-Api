const { getCompare, checkDate } = require('./general');

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

const checkStartDate = (req, res, next) => {
  if (checkDate(req.body.startDate) === false) {
    next({
      status: 406,
      message: 'Invalid format or date in startDate',
    });
  } else {
    next();
  }
};

const checkEndDate = (req, res, next) => {
  if (checkDate(req.body.endDate) === false) {
    next({
      status: 406,
      message: 'Invalid format or date in endDate',
    });
  } else {
    next();
  }
};

const checkStartLowerThanEnd = (req, res, next) => {
  const aux1 = req.body.startDate.split('-');
  const aux2 = req.body.endDate.split('-');

  const startDate = new Date(aux1[0], aux1[1] - 1, aux1[2]);
  const endDate = new Date(aux2[0], aux2[1] - 1, aux2[2]);

  if (startDate >= endDate) {
    next({
      status: 406,
      message: 'The startDate has to be lower than endDate',
    });
  }
  next();
};

const checkActive = (req, res, next) => {
  if (getCompare.binary.test(req.body.active) === false) {
    next({
      status: 406,
      message: 'Invalid format in active',
    });
  } else {
    next();
  }
};

const checkNumAttributesPut = (req, res, next) => {
  const numKeys = Object.keys(req.body).length;
  if (numKeys === 0) {
    next({
      status: 406,
      message: 'Put needs to receive at least one parameter',
    });
  } else if (numKeys > 2) {
    next({
      status: 406,
      message: 'Put is receiving not expected parameters',
    });
  } else {
    next();
  }
};

const checkNumAttributesPatch = (req, res, next) => {
  if (Object.keys(req.body).length !== 1) {
    next({
      status: 406,
      message: 'Patch needs to receive one parameter',
    });
  } else {
    next();
  }
};

const checkAttributesPatch = (req, res, next) => {
  if (req.body.active !== undefined) {
    checkActive(req, res, next);
  } else if (req.body.endDate !== undefined) {
    checkEndDate(req, res, next);
  } else {
    next({
      status: 406,
      message: 'Patch is receiving not expected parameters',
    });
  }
};

const checkAllPost = [
  checkUserId,
  checkLocationId,
  checkStartDate,
  checkEndDate,
  checkStartLowerThanEnd,
];

const checkAllPut = [
  checkNumAttributesPut,
  checkActive,
  checkEndDate,
];

const checkAllPatch = [
  checkNumAttributesPatch,
  checkAttributesPatch,
];

module.exports = {
  checkUserId,
  checkLocationId,
  checkStartDate,
  checkEndDate,
  checkActive,
  checkAllPost,
  checkAllPut,
  checkAllPatch,
};
