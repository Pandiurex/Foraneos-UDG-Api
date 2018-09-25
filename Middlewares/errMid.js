function login() {
  return true;
}

function isEmpty(valor) {
  const empty = /^(\w+\S+)$/;
  if (!empty.exec(valor)) {
    return false;
  }
  return true;
}

function isEmail(valor) {
  const re = /^([\da-z-]+)@([\da-z-]+)([a-z]{2,6})$/;
  if (!re.exec(valor)) {
    return false;
  }
  return true;
}

function isPassword(valor) {
  const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!passReg.exec(valor)) {
    return false;
  }
  return true;
}


function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Unexpected Error!' });
  } else {
    next(err);
  }
}

const checkLogin = (err, req, res, next) => {
  if (login()) next(err);
  else res.status(500).send({ error: 'Unexpected Error! during Login, Try again' });
};

const emptyValid = (err, req, res, next) => {
  if (isEmpty(req.body)) {
    res.status(406).send('Cannot be there empty spaces , Try again');
  }
  next(err);
};

const nameValid = (err, req, res, next) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(406).send('el nombre es demasiado corto');
  }
  next(err);
};

const passwordValid = (err, req, res, next) => {
  if (isPassword(req.body.password.value)) {
    res.status(406).send('Password invalid, Try again');
  }
  next(err);
};

const emailValid = (err, req, res, next) => {
  if (isEmail(req.body.email.value)) {
    res.status(406).send('Email invalid, Try again');
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.render('error', { error: err });
  next(err);
};

module.exports = {
  clientErrorHandler,
  checkLogin,
  emptyValid,
  nameValid,
  passwordValid,
  emailValid,
  errorHandler,
};
