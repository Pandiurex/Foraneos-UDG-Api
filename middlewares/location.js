const { getCompare } = require('./general');

const checkOrderBy = (req, res, next) => {
  const { orderBy } = req.query;
  if (orderBy !== 'cost'
    && orderBy !== 'avgRate'
    && orderBy !== 'avgServicesRate'
    && orderBy !== 'avgSecurityRate'
    && orderBy !== 'avgLocalizationRate'
    && orderBy !== 'avgCostBenefictRate') {
    next({
      status: 406,
      message: 'Invalid value of orderBy',
    });
  }
};

const checkOrderSense = (req, res, next) => {
  const { orderSense } = req.query;
  if (orderSense !== 'ASC'
    && orderSense !== 'DESC') {
    next({
      status: 406,
      message: 'Invalid value of orderSense',
    });
  }
};

const checkOrder = (req, res, next) => {
  if (req.query.orderBy && req.query.orderSense) {
    checkOrderBy(req, res, next);
    checkOrderSense(req, res, next);
    next();
  } else if (req.query.orderBy === undefined
    && req.query.orderSense === undefined) {
    next();
  } else {
    next({
      status: 406,
      message: 'Parameters orderBy and orderSense has to be together',
    });
  }
};

const checkLimitOffset = (req, res, next) => {
  const { limitOffset } = req.query;
  if (limitOffset < 0) {
    next({
      status: 406,
      message: 'Invalid value of limitOffset',
    });
  }
};

const checkLimitCount = (req, res, next) => {
  const { limitCount } = req.query;
  if (limitCount < 5) {
    next({
      status: 406,
      message: 'Invalid value of limitCount',
    });
  }
};

const checkLimit = (req, res, next) => {
  if (req.query.limitOffset && req.query.limitCount) {
    checkLimitOffset(req, res, next);
    checkLimitCount(req, res, next);
    next();
  } else if (!req.query.limitOffset && !req.query.limitCount) {
    next();
  } else {
    next({
      status: 406,
      message: 'Parameters limitOffset and limitCount has to be together',
    });
  }
};

const checkOwnerUserId = (req, res, next) => {
  if (getCompare.number.test(req.body.ownerUserId) === false) {
    next({
      status: 406,
      message: 'Invalid format in ownerUserId',
    });
  } else {
    next();
  }
};

const checkLattitude = (req, res, next) => {
  if (getCompare.latLon.test(req.body.lattitude) === false) {
    next({
      status: 406,
      message: 'Invalid format in lattitude',
    });
  } else {
    next();
  }
};

const checkLongitude = (req, res, next) => {
  if (getCompare.latLon.test(req.body.longitude) === false) {
    next({
      status: 406,
      message: 'Invalid format in longitude',
    });
  } else {
    next();
  }
};

const checkStreet = (req, res, next) => {
  if (getCompare.word.test(req.body.street) === false
    || req.body.street === undefined) {
    next({
      status: 406,
      message: 'Invalid format in street',
    });
  } else {
    next();
  }
};

const checkColony = (req, res, next) => {
  if (getCompare.word.test(req.body.colony) === false
    || req.body.colony === undefined) {
    next({
      status: 406,
      message: 'Invalid format in colony',
    });
  } else {
    next();
  }
};

const checkPostalCode = (req, res, next) => {
  if (req.body.postalCode === undefined) {
    next();
  } else if (getCompare.postal.test(req.body.postalCode) === false) {
    next({
      status: 406,
      message: 'Invalid format in postalCode',
    });
  } else {
    next();
  }
};

const checkStreetAcross1 = (req, res, next) => {
  if (getCompare.word.test(req.body.streetAcross1) === false
    || req.body.streetAcross1 === undefined) {
    next({
      status: 406,
      message: 'Invalid format in streetAcross1',
    });
  } else {
    next();
  }
};

const checkStreetAcross2 = (req, res, next) => {
  if (req.body.streetAcross2 === undefined) {
    next();
  } else if (getCompare.word.test(req.body.streetAcross2) === false) {
    next({
      status: 406,
      message: 'Invalid format in streetAcross2',
    });
  } else {
    next();
  }
};

const checkExtNum = (req, res, next) => {
  if (getCompare.number.test(req.body.extNum) === false) {
    next({
      status: 406,
      message: 'Invalid format in extNum',
    });
  } else {
    next();
  }
};

const checkIntNum = (req, res, next) => {
  if (req.body.intNum === undefined) {
    next();
  } else if (getCompare.number.test(req.body.intNum) === false) {
    next({
      status: 406,
      message: 'Invalid format in intNum',
    });
  } else {
    next();
  }
};

const checkSexType = (req, res, next) => {
  if (getCompare.number.test(req.body.sexType) === false) {
    next({
      status: 406,
      message: 'Invalid format in sexType',
    });
  } else if (req.body.sexType < 0 || req.body.sexType > 2) {
    next({
      status: 406,
      message: 'Invalid format in sexType',
    });
  } else {
    next();
  }
};

const checkNumRooms = (req, res, next) => {
  if (getCompare.number.test(req.body.numRooms) === false) {
    next({
      status: 406,
      message: 'Invalid format in numRooms',
    });
  } else if (req.body.numRooms <= 0) {
    next({
      status: 406,
      message: 'Invalid format in numRooms',
    });
  } else {
    next();
  }
};

const checkDescription = (req, res, next) => {
  if (req.body.description === undefined) {
    next();
  } else if (getCompare.paragraph.test(req.body.description) === false) {
    next({
      status: 406,
      message: 'Invalid format in description',
    });
  } else {
    next();
  }
};

const checkRestrictions = (req, res, next) => {
  if (req.body.restrictions === undefined) {
    next();
  } else if (getCompare.paragraph.test(req.body.restrictions) === false) {
    next({
      status: 406,
      message: 'Invalid format in restrictions',
    });
  } else {
    next();
  }
};

const checkCost = (req, res, next) => {
  if (getCompare.decimal.test(req.body.cost) === false) {
    next({
      status: 406,
      message: 'Invalid format in cost',
    });
  } else {
    next();
  }
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
  } else if (numKeys > 7) {
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
  } else if (req.body.postalCode !== undefined) {
    checkPostalCode(req, res, next);
  } else if (req.body.sexType !== undefined) {
    checkSexType(req, res, next);
  } else if (req.body.numRooms !== undefined) {
    checkNumRooms(req, res, next);
  } else if (req.body.description !== undefined) {
    checkDescription(req, res, next);
  } else if (req.body.restrictions !== undefined) {
    checkRestrictions(req, res, next);
  } else if (req.body.cost !== undefined) {
    checkCost(req, res, next);
  } else {
    next({
      status: 406,
      message: 'Patch is receiving not expected parameters',
    });
  }
};

const checkAllGetAll = [
  checkOrder,
  checkLimit,
];

const checkAllPost = [
  checkOwnerUserId,
  checkLattitude,
  checkLongitude,
  checkStreet,
  checkColony,
  checkPostalCode,
  checkStreetAcross1,
  checkStreetAcross2,
  checkExtNum,
  checkIntNum,
  checkSexType,
  checkNumRooms,
  checkDescription,
  checkRestrictions,
  checkCost,
];

const checkAllPut = [
  checkNumAttributesPut,
  checkActive,
  checkPostalCode,
  checkSexType,
  checkNumRooms,
  checkDescription,
  checkRestrictions,
  checkCost,
];

const checkAllPatch = [
  checkNumAttributesPatch,
  checkAttributesPatch,
];

module.exports = {
  checkActive,
  checkAllGetAll,
  checkAllPost,
  checkAllPut,
  checkAllPatch,
};
