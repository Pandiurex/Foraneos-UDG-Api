const bcrypt = require('bcrypt');
const {
  token,
} = require('../models');
const {
  usersController,
} = require('../controllers');


const register = (req, res, next) => {

  // Crear usuario
  const user = usersController.create(req);

  // Crear el token
  bcrypt.hash(`${req.body.username}`, process.env.SECRET, (err, hash) => {

    token.create({
      token: hash,
      createdAt: new Date(),
      expires: 12,
      status: 1,
      userId: user.id,
    })
});

  // Hashear pass y guardar en la bd
bcrypt.hash(req.body.password, process.env.SECRET)
    .then((hashedPassword) => {
      // guardar bd user y pass hasheado  return usersDB.saveUser(req.boy.username, hashedPassword);
    })
    .then(() => {
      res.send();
    })
    .catch((error) => {
      console.log('Error saving user: ');
      console.log(error);
      next();
    });
};

const login = (req, res, next) => {
  user = User.get(req);
  // crear token

  bcrypt.hash(`${req.body.username}`, process.env.SECRET, (err, hash) => {

    token.create({
      token: hash,
      createdAt: new Date(),
      expires: 12,
      status: 1,
      userId: user.id
    })
});


usersDB.getUserByUsername(req.body.username)
    .then((user) => {
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((samePassword) => {
      if(!samePassword) {
        res.status(403).send();
      }
      res.send();
    })
    .catch((error) => {
      console.log('Error authenticating user: ');
      console.log(error);
      next();
    });
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
  session,
};
