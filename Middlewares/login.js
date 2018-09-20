function login() {
  return true;
}

exports.checkLogin = (req, res, next) => {
  if (login()) {
    next();
  } else {
    res.send('No te has identificado!');
  }
};
