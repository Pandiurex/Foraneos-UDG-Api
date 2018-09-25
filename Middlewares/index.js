function login() {
  return true;
}

function isEmail(valor) {
  const re = /^([\da-z-]+)@([\da-z-]+)([a-z]{2,6})$/;
  if (!re.exec(valor)) {
    return false;
  }
  return true;
}

const checkLogin = (req, res, next) => {
  if (login()) next();
  else res.send('No te has identificado!');
};

const requestTime = (req, res, next) => {
  req.body.requestTime = Date.now();
  next();
};

const idValid = (req, res, next) => {
  if (!req.body.id || req.body.id > 10) {
    res.status(400).send('No existe el id');
  }
  next();
};

const nameValid = (req, res, next) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('el nombre es demasiado corto');
  }
  next();
};

const passwordValid = (req, res, next) => {
  if (req.body.password.length < 6) {
    res.status(400).send('El password es demasiado corto');
  }
  next();
};

const emailValid = (req, res, next) => {
  if (isEmail(req.body.email.value)) {
    res.status(400).send('El correo no es valido');
  }
  next();
};

module.exports = {
  checkLogin,
  requestTime,
  idValid,
  nameValid,
  passwordValid,
  emailValid,
};
