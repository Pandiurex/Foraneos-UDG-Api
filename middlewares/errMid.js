function getCompare() {
  return {
    word: /^[a-zA-Z_áéíóúñ\s]*$/,
    email: /\S+@\S+\.\S+/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    number: /^([0-9])+$/,
    decimal: /^\d+\.\d{0,2}$/,
    login: true,
  };
}

function isValidDate(birthdate) {
  let valid = true;

  const arr = birthdate.split('-');

  const year = arr[0];
  const month = arr[1];
  const day = arr[2];

  console.log(year);
  console.log(month);
  console.log(day);

  if (getCompare().number.test(day) === false) valid = false;
  if (getCompare().number.test(month) === false) valid = false;
  if (getCompare().number.test(year) === false) valid = false;

  if (month < 1 || month > 12) valid = false;
  else if ((day < 1) || (day > 31)) valid = false;
  else if (((month === 4) || (month === 6) || (month === 9) || (month === 11))
    && (day > 30)) valid = false;
  else if ((month === 2) && ((year % 4) === 0) && ((year % 100) !== 0)) valid = true;
  else if ((month === 2) && ((year % 100) === 0) && (day > 29)) valid = false;
  else if ((month === 2) && (day > 28)) valid = false;

  console.log(valid);

  return valid;
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
  if (getCompare().word.test(req.body.name) === false) {
    res.status(406).send('Name cant contain numbers, try Again');
  }
  next();
};
const surnameValid = (req, res, next) => {
  if (getCompare().word.test(req.body.firstSurnameValid) === false
    || getCompare().word.test(req.body.secondSurnameValid) === false) {
    res.status(406).send('Surname cant contain numbers, try Again');
  }
  next();
};

const passwordValid = (req, res, next) => {
  if (getCompare().password.test(req.body.password) === false) {
    res.status(406).send('Password invalid, Try again');
  }
  next();
};

const emailValid = (req, res, next) => {
  if (getCompare().email.test(req.body.mainEmail) === false) {
    res.status(406).send('Email invalid, Try again');
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
  if (getCompare().number.test(req.body.userType) === false) {
    res.status(406).send('UserType invalid, Try again');
  }
  next();
};

// Location Valids

const lattLongValid = (req, res, next) => {
  if (getCompare().decimal.test(req.body.lattitude) === false
    || getCompare().decimal.test(req.body.longitude) === false) {
    res.status(406).send('Lattitude Or Longitude are invalid, Try again');
  }
  next();
};

const streetValid = (req, res, next) => {
  if (getCompare().word.test(req.body.street) === false
    || getCompare().word.test(req.body.colony) === false
    || getCompare().word.test(req.body.streetAcross1) === false
    || getCompare().word.test(req.body.streetAcross2) === false) {
    res.status(406).send('Streets cant contain numbers, try Again');
  }
  next();
};

const numLocationsValid = (req, res, next) => {
  if (getCompare().number.test(req.body.postalCode) === false
    || getCompare().number.test(req.body.extNum) === false
    || getCompare().number.test(req.body.intNum) === false) {
    res.status(406).send('Error at Postal Code, ext Num or Int Num, Try again');
  }
  next();
};

const decimalLocationValid = (req, res, next) => {
  if (getCompare().decimal.test(req.body.cost) === false) {
    res.status(406).send('The Cost can only be numerical, Try again');
  }
  next();
};

const activeValid = (req, res, next) => {
  if (req.body.active === 0 || req.body.active === 1) next();
  else {
    res.status(406).send('Active Status attribute can only be 1 or 0, Try Again');
  }
};

const roomValid = (req, res, next) => {
  if (getCompare().number.test(req.body.numRooms) === false) {
    res.status(406).send('Error at numRooms, Try again');
  }
  next();
};
const availableRoomValid = (req, res, next) => {
  if (getCompare().number.test(req.body.availableRooms) === false
    || req.body.availableRooms > req.body.numRooms) {
    res.status(406).send('Must be number or available Rooms cannot be higher than numRooms, Try again');
  }
  next();
};

// Rates Middlewares

const validDate = (req, res, next) => {
  if (isValidDate(req.body.rateDay, req.body.rateMonth, req.body.rateYear) === false) {
    res.status(406).send('Date invalid, Try again');
  } else {
    next();
  }
};

const numberRateValid = (req, res, next) => {
  if (getCompare().number.test(req.body.servicesRate) === false
    || getCompare().number.test(req.body.securityRate) === false
    || getCompare().number.test(req.body.costBenefictRate) === false
    || getCompare().number.test(req.body.localizationRate) === false
    || req.body.servicesRate > 5 || req.body.servicesRate < 0
    || req.body.securityRate > 5 || req.body.securityRate < 0
    || req.body.costBenefictRate > 5 || req.body.costBenefictRate < 0
    || req.body.localizationRate > 5 || req.body.localizationRate < 0) {
    res.status(406).send('Error at Rates Values, Try again');
  }
  next();
};

// Message Middlewares

const requestTime = (req, res, next) => {
  req.body.requestTime = Date.now();
  next();
};

// / Lives In Middlewares

const startDateValid = (req, res, next) => {
  if (isValidDate(req.body.startDay, req.body.startMonth, req.body.startYear) === false) {
    res.status(406).send('Date invalid, Try again');
  } else {
    next();
  }
};
const endDateValid = (req, res, next) => {
  if (isValidDate(req.body.endDay, req.body.endMonth, req.body.endYear) === false) {
    res.status(406).send('Date invalid, Try again');
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
