const bcrypt = require('bcrypt');
const { Token } = require('../models');
const { User } = require('../models');
const { usersController } = require('../controllers');

class Auth {
  constructor() {
    this.salt = process.env.SECRET;

    // Binding this to not loose context on router
    this.haveSession = this.haveSession.bind(this);
  }

  haveSession(req, res, next) {
    const token = this.getHeaderToken(req.headers.authorization);
    this.token = Token.get(token);
    if (this.isActive()) {
      // Add to the request a session object with user and all session information
      //
      req.session = {
        token: this,
        user: usersController.get(this.token.userId),
      };
      next();
    } else {
      next({
        status: 403,
        message: 'You need to be logged',
      });
    }
  }

  static getHeaderToken(bearer) {
    return bearer.split(' ')[1];
  }

  static havePermissions(req, res, next) {
    // Validate if the user can do this action
    // hint: can take the route to make sure about which is the action
    //
    // req.session.user.canDo('edit')
  }


  static isActive() {
    // Compare the current datetime with the one from the token and the expiration
    // in case is out of the time scope, return false and deactivate the Token
    //
    const now = new Date();
    if (now + this.token.expires > this.token.createdAt + this.token.expires) {
      this.token.deactive();
      return false;
    }
    return true;
  }
}

const register = (req, res, next) => {
  // Crear usuario
  const user = usersController.create(req);
  const date = new Date();

  // Crear el token
  bcrypt.hash(`${req.body.username}${req.body.password}${date}`, process.env.SECRET, (err, hash) => {
    Token.create({
      token: hash,
      createdAt: new Date(),
      expires: 12,
      status: 1,
      userId: user.id,
    });
  });
  res.send(Token).status(201); // se Tiene que regresar el token
  next();
};

const login = (req, res, next) => {
  // Obtener el usuario
  const user = User.get(req.body.id);
  const date = new Date();


  // Crear el token
  bcrypt.hash(`${req.body.username}${req.body.password}${date}`, process.env.SECRET, (err, hash) => {
    Token.create({
      token: hash,
      createdAt: new Date(),
      expires: 12,
      status: 1,
      userId: user.id,
    });
  });
  res.send(Token).status(201); // se Tiene que regresar el token
  next();
};

module.exports = new Auth();
module.exports = register;
module.exports = login;

// const register = (req, res, next) => {
//   // Crear usuario
//   const user = usersController.create(req);
//   const date = new Date();
//
//   // Crear el token
//   bcrypt.hash(`${req.body.username}${req.body.password}${date}`, process.env.SECRET, (err, hash) => {
//     token.create({
//       token: hash,
//       createdAt: new Date(),
//       expires: 12,
//       status: 1,
//       userId: user.id,
//     });
//   });
//   res.send(hash).status(201); // se Tiene que regresar el token
//   next();
// };
//
// const login = (req, res, next) => {
//   user = User.get(req);
//   // crear token
//
//   bcrypt.hash(`${req.body.username}`, process.env.SECRET, (err, hash) => {
//     token.create({
//       token: hash,
//       createdAt: new Date(),
//       expires: 12,
//       status: 1,
//       userId: user.id,
//     });
//   });
//
//
//   usersDB.getUserByUsername(req.body.username)
//     .then(user => bcrypt.compare(req.body.password, user.password))
//     .then((samePassword) => {
//       if (!samePassword) {
//         res.status(403).send();
//       }
//       res.send();
//     })
//     .catch((error) => {
//       console.log('Error authenticating user: ');
//       console.log(error);
//       next();
//     });
// };
//
// const logout = (req, res, next) => {
//   token.destroy();
// };
//
// const session = (req, res, next) => {
//   let result;
//   if (token === req) {
//     token.active(token);
//     next();
//   } else {
//     result = {
//       error: {
//         status: 406,
//         message: 'User is not Logged, Try again',
//       },
//     };
//     res.status(406).send(result);
//   }
// };
//
// module.exports = {
//   register,
//   login,
//   logout,
//   session,
// };
