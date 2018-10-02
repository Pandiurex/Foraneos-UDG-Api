function getCompare() {
  return {
    word: /^[a-zA-Z_áéíóúñ\s]*$/,
    email: /\S+@\S+\.\S+/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    number: /^([0-9])+$/,
    decimal: /^(\d|-)?(\d|,)*\.?\d*$/,
    login: true,
  };
}

function isValidDate(bDay, bMonth, bYear) {
  let valid = true;

  const month = bMonth;
  const day = bDay;
  const year = bYear;

  if (getCompare().number.test(bDay) === false) valid = false;
  if (getCompare().number.test(bMonth) === false) valid = false;
  if (getCompare().number.test(bYear) === false) valid = false;

  if (month < 1 || month > 12) valid = false;
  else if ((day < 1) || (day > 31)) valid = false;
  else if (((month === 4) || (month === 6) || (month === 9) || (month === 11))
        && (day > 30)) valid = false;
  else if ((month === 2) && ((year % 4) === 0) && ((year % 100) !== 0)) valid = true;
  else if ((month === 2) && ((year % 100) === 0) && (day > 29)) valid = false;
  else if ((month === 2) && (day > 28)) valid = false;

  return valid;
}

const validDate = (req, res, next) => {
  if (isValidDate(req.body.birthDay, req.body.birthMonth, req.body.birthYear) === false) {
    res.status(406).send('Date invalid, Try again');
  } else {
    next();
  }
};

const genderValid = (req, res, next) => {
  if (req.body.gender === 0 || req.body.gender === 1) next();
  else {
    res.status(406).send('Gender attribute can only be 1 or 0, Try Again');
  }
};

const requestTime = (req, res, next) => {
  req.body.requestTime = Date.now();
  next();
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
    res.status(406).send('Yhe Cost can only be numerical, Try again');
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

module.exports = {
  checkLogin,
  validDate,
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
};
