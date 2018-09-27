function getCompare() {
  return {
    word: /[a-zA-ZÃƒÂ±Ãƒâ€˜ ]{3,}/,
    email: /\S+@\S+\.\S+/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    login: true,
  };
}

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
    res.status(406).send('Short Name, try Again');
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
  if (getCompare().email.test(req.body.email) === false) {
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


module.exports = {
  checkLogin,
  nameValid,
  passwordValid,
  emailValid,
  ensureAuth,
  requestTime,
  requestUrl,
  requestType,
  userGet,
  userSend,
};
