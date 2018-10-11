const register = (req, res, next) => {

};

const login = (req, res, next) => {
  user = User.get(req);
  // crear token
};

const logout = (req, res, next) => {
  token.destroy();
};

const session = (req, res, next) => {
  let result;
  if (token === req) {
    Token.active(token);
    next();
  } else {
    result = {
      error: {
        status: 406,
        message: 'User is not Logged, Try again',
      },
    };
    res.status(406).send(result);
  }
};

module.exports = {
  register,
  login,
  logout,
};
