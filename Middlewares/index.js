function login() {
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

module.exports = {
  checkLogin,
  requestTime,
};
