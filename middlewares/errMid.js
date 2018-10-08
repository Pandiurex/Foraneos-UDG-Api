function getCompare() {
  return {
    word: /^[a-zA-Z_áéíóúñ\s]*$/,
    email: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
    number: /^([0-9])+$/,
    decimal: /^\d+\.\d{0,2}$/,
    latLon: /^(\d*\.)?\d+$/,
    login: true,
    postal: /^([0-9]){1,5}$/,
  };
}

function isValidDate(birthdate) {
  const arr = birthdate.split('-');

  const year = arr[0];
  const month = arr[1];
  const day = arr[2];

  const date = new Date(year, month, '0');
  if ((day - 0) > (date.getDate() - 0)) {
    return false;
  }
  return true;
}

const birthDateValid = (req, res, next) => {
  let result = isValidDate(req.body.birthdate);
  if (result === false) {
    result = {
      error: {
        status: 406,
        message: 'Date invalid, Try again',
      },
    };
    res.status(406).send(result);
  } else {
    next();
  }
};

const genderValid = (req, res, next) => {
  let result = req.body.gender;
  if (result === 0 || result === 1) next();
  else {
    result = {
      error: {
        status: 406,
        message: 'Gender attribute can only be 1 or 0, Try Again',
      },
    };
    res.status(406).send(result);
  }
};

const requestUrl = (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
};

const requestType = (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
};

const userGet = (req, res, next) => {
  console.log('ID:', req.params.id);
  next();
};
const userSend = (req, res, next) => {
  res.send('User Info');
  next();
};

const checkLogin = (req, res, next) => {
  if (getCompare().login) next();
  else {
    res.status(404).send({
      error: 'Unexpected Error! during Login, Try again',
    });
  }
};

const nameValid = (req, res, next) => {
  let result = getCompare().word.test(req.body.name);
  if (result === false) {
    result = {
      error: {
        status: 406,
        message: 'Name cant contain numbers, Try Again',
      },
    };
    res.status(406).send(result);
  }
  next();
};
const surnameValid = (req, res, next) => {
  let result;
  if (getCompare().word.test(req.body.firstSurname) === false
    || getCompare().word.test(req.body.secondSurname) === false) {
    result = {
      error: {
        status: 406,
        message: 'Surnames cant contains numbers, Try Again',
      },
    };
    res.status(406).send(result);
  }
  next();
};

const passwordValid = (req, res, next) => {
  let result = getCompare().password.test(req.body.password);
  if (result === false) {
    result = {
      error: {
        status: 406,
        message: 'Password must contain letters (Lower Case and Upper Case) and numbers and be 6-20 characters, Try Again',
      },
    };
    res.status(406).send(result);
  }
  next();
};

const emailValid = (req, res, next) => {
  let result = getCompare().email.test(req.body.mainEmail);
  if (result === false) {
    result = {
      error: {
        status: 406,
        message: 'Email Invalid, Try Again',
      },
    };
    res.status(406).send(result);
  }
  next();
};

const ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).send({
      message: 'There is no authentication header in request.',
    });
  }
  next();
};

const userTypeValid = (req, res, next) => {
  let result = req.body.userType;
  if (result === 0 || result === 1 || result === 2) next();
  else {
    result = {
      error: {
        status: 406,
        message: 'User Type Invalid, can only be 0, 1, 2, Try Again',
      },
    };
    res.status(406).send(result);
  }
};

// Location Valids

const lattLongValid = (req, res, next) => {
  let result;
  if (getCompare().latLon.test(req.body.lattitude) === false
    || getCompare().latLon.test(req.body.longitude) === false) {
    result = {
      error: {
        status: 406,
        message: 'Lattitude or Longitud are Invalid, Try Again',
      },
    };
    res.status(406).send(result);
  }
  next();
};

const streetValid = (req, res, next) => {
  let result;
  if (getCompare().word.test(req.body.street) === false
    || getCompare().word.test(req.body.colony) === false
    || getCompare().word.test(req.body.streetAcross1) === false
    || getCompare().word.test(req.body.streetAcross2) === false) {
    result = {
      error: {
        status: 406,
        message: 'Street, Colony, Acrros1 or Across2 cant contain numbers, try Again',
      },
    };
    res.status(406).send(result);
  }
  next();
};

const numLocationsValid = (req, res, next) => {
  let result;
  if (getCompare().postal.test(req.body.postalCode) === false
    || getCompare().number.test(req.body.extNum) === false
    || getCompare().number.test(req.body.intNum) === false) {
    result = {
      error: {
        status: 406,
        message: 'Error at Postal Code, ext Num or Int Num, Try again',
      },
    };
    res.status(406).send(result);
  }
  next();
};

const decimalLocationValid = (req, res, next) => {
  let result;
  if (getCompare().decimal.test(req.body.cost) === false) {
    result = {
      error: {
        status: 406,
        message: 'The Cost can only be numerical and must have 2 decimals after . , Try again',
      },
    };
    res.status(406).send(result);
  }
  next();
};

const activeValid = (req, res, next) => {
  let result;
  if (req.body.active === 0 || req.body.active === 1) next();
  else {
    result = {
      error: {
        status: 406,
        message: 'Active Status attribute can only be 1 or 0, Try Again',
      },
    };
    res.status(406).send(result);
  }
};

const roomValid = (req, res, next) => {
  let result;
  if (getCompare().number.test(req.body.numRooms) === false) {
    result = {
      error: {
        status: 406,
        message: 'Error at numRooms, Try again',
      },
    };
    res.status(406).send(result);
  }
  next();
};
const availableRoomValid = (req, res, next) => {
  let result;
  if (getCompare().number.test(req.body.availableRooms) === false
    || req.body.availableRooms > req.body.numRooms) {
    result = {
      error: {
        status: 406,
        message: 'Must be number and available Rooms cannot be higher than numRooms, Try again',
      },
    };
    res.status(406).send(result);
  }
  next();
};

// Rates Middlewares

const validDate = (req, res, next) => {
  let result = isValidDate(req.body.date);
  if (result === false) {
    result = {
      error: {
        status: 406,
        message: 'Date invalid, Try again',
      },
    };
    res.status(406).send(result);
  } else {
    next();
  }
};

const numberRateValid = (req, res, next) => {
  let result;
  if (getCompare().number.test(req.body.servicesRate) === false
    || getCompare().number.test(req.body.securityRate) === false
    || getCompare().number.test(req.body.costBenefictRate) === false
    || getCompare().number.test(req.body.localizationRate) === false
    || req.body.servicesRate > 5 || req.body.servicesRate < 0
    || req.body.securityRate > 5 || req.body.securityRate < 0
    || req.body.costBenefictRate > 5 || req.body.costBenefictRate < 0
    || req.body.localizationRate > 5 || req.body.localizationRate < 0) {
    result = {
      error: {
        status: 406,
        message: 'Error at rates values, Try again',
      },
    };
    res.status(406).send(result);
  } else {
    next();
  }
};

// Message Middlewares

const requestTime = (req, res, next) => {
  req.body.requestTime = Date.now();
  next();
};

// / Lives In Middlewares

const startDateValid = (req, res, next) => {
  let result = isValidDate(req.body.startDate);
  if (result === false) {
    result = {
      error: {
        status: 406,
        message: 'Date invalid, Try again',
      },
    };
    res.status(406).send(result);
  } else {
    next();
  }
};
const endDateValid = (req, res, next) => {
  let result = isValidDate(req.body.endDate);
  if (result === false) {
    result = {
      error: {
        status: 406,
        message: 'Date invalid, Try again',
      },
    };
    res.status(406).send(result);
  } else {
    next();
  }
};

const paramsValid = (req, res, next) => {
  if (getCompare().number.test(req.params.id) === false) {
    res.status(406).send('URL contains invalid request, Try again');
  } else {
    next();
  }
};

module.exports = {
  checkLogin,
  birthDateValid,
  userTypeValid,
  surnameValid,
  genderValid,
  nameValid,
  passwordValid,
  emailValid,
  ensureAuth,
  requestTime,
  requestUrl,
  requestType,
  userGet,
  userSend,
  lattLongValid,
  streetValid,
  numLocationsValid,
  decimalLocationValid,
  activeValid,
  roomValid,
  availableRoomValid,
  validDate,
  numberRateValid,
  startDateValid,
  endDateValid,
  paramsValid,
};
