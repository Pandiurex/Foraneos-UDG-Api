const bcrypt = require('bcrypt');
const {
  token,
} = require('../models');
const {
  usersController,
} = require('../controllers');


const register = (req, res, next) => {

  //Crear usuario
  //user = usersController.create(req);

  // Crear el token
    bcrypt.hash(`${user.name}${date}`, process.env.SECRET, (err, hash) => {

    token.create({
      nToken: 'aws',
      createdAt: new Date(),
      expires: 12,
      status: 1,
      userId: user.id
    })
});

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
    token.active(token);
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
