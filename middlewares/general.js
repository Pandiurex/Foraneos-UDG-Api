const getCompare = {
  word: /^[a-zA-Z_áéíóúñ\s]*$/,
  email: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
  number: /^([0-9])+$/,
  decimal: /^\d+\.\d{0,2}$/,
  latLon: /^(\d*\.)?\d+$/,
  postal: /^([0-9]){1,5}$/,
};

const checkParamId = (req, res, next) => {
  if (getCompare.number.test(req.params.id) === false) {
    const result = {
      error: {
        status: 406,
        message: 'Invalid format in param id',
      },
    };
    res.status(406).send(result);
  } else {
    next();
  }
};

const checkParamUserId = (req, res, next) => {
  if (getCompare.number.test(req.params.userId) === false) {
    const result = {
      error: {
        status: 406,
        message: 'Invalid format in param userId',
      },
    };
    res.status(406).send(result);
  } else {
    next();
  }
};

const checkParamLocationId = (req, res, next) => {
  if (getCompare.number.test(req.params.locationId) === false) {
    const result = {
      error: {
        status: 406,
        message: 'Invalid format in param locationId',
      },
    };
    res.status(406).send(result);
  } else {
    next();
  }
};

module.exports = {
  getCompare,
  checkParamId,
  checkParamUserId,
  checkParamLocationId,
};
