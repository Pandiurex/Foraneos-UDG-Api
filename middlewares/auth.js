const bcrypt = require('bcrypt');
const { token } = require('../models');
const { user } = require('../models');

const CONFIRM_EMAIL_TYPE = 'ce';
const SESSION_TYPE = 's';
const RECOVER_PASS_TYPE = 'r';

class Auth {
  static async generateToken({ username, id }, type) {
    let hash = '';

    const createdAt = new Date();
    const expires = createdAt;

    if (type === CONFIRM_EMAIL_TYPE) {
      expires.setYear((expires.getYear() + 10));
    } else if (type === SESSION_TYPE) {
      expires.setHours((expires.getHours() + 1));
    } else if (type === RECOVER_PASS_TYPE) {
      expires.setMinutes((expires.getMinutes() + 10));
    }

    const key = `INCIO ${username}${createdAt} FINAL`;

    hash = bcrypt.hashSync(key, Number(process.env.SECRET));

    await token.create({
      hash,
      createdAt,
      expires,
      type,
      userId: id,
    });

    return hash;
  }

  static async register(req, res) {
    const hash = this.generateToken(req.body, CONFIRM_EMAIL_TYPE);

    res.send({
      hash,
      user: req.body,
    });

    // Enviar por email la url con el hash de confirmacion de correo
  }

  static async recoverPassByUsername(req, res) {
    const hash = this.generateToken(user.getByUsername(req.query),
      CONFIRM_EMAIL_TYPE);

    res.send({
      hash,
      user: req.body,
    });

    // Enviar por email la url con el hash de confirmacion de correo
  }

  static async login(req, res) {
    const userId = await user.checkUsernamePass(req.query);

    if (userId === 0) {
      const result = {
        error: {
          status: 400,
          message: 'Username or Password incorrect',
        },
      };
      res.status(400).send(result);
    } else {
      const token1 = await token.getActiveToken(userId, SESSION_TYPE);

      // Falta comprobar si el token no ha expirado

      if (token1 === 0) {
        // obtenemos el objeto usuario de ese id para generar token
        const newUser = await user.get(userId);

        const hash = await Auth.generateToken(newUser,
          SESSION_TYPE);

        res.send({
          hash,
        });
      } else {
        // obtenemos el token activo de ese usuario
        res.send({
          hash: token1.hash,
        });
      }
    }
  }

  // logout(token, next) {
  //   this.statusToken = Token.get(token);
  //   if (this.statusToken) {
  //     Token.destroy(token)
  //       .then(() => next())
  //       .catch((e) => {
  //         console.error(`.catch(${e})`);
  //         next(e);
  //       });
  //   }
  // }

  // haveSession(req, res, next) {
  //   const token = this.getHeaderToken(req.headers.authorization);
  //   this.token = Token.get(token);
  //   if (this.isActive()) {
  //     req.session = {
  //       token: this.token,
  //       user: User.get(this.token.userId),
  //     };
  //     next();
  //   } else {
  //     next({
  //       status: 403,
  //       message: 'You need to loggin',
  //     });
  //   }
  // }

  // havePermission(req, res, next) {
  //   this.method = req.method;
  //   if (req.session.User.haveaccess(this.method, req.originalUrl)) {
  //     next();
  //   } else {
  //     res.send('NON authorization');
  //   }
  // }

  // isActive() {
  //   const time = new Date();
  //   if (time > this.token.createdAt + this.token.expires) {
  //     this.token.destroy();
  //     return false;
  //   }
  //   return true;
  // }

  // getHeaderToken(bearer) {
  //   //  obtenemos token
  //   return this.bearer.split(' ')[1];
  // }
}

module.exports = Auth;

//
// class Auth {
//   constructor() {
//     this.salt = process.env.SECRET;
//
//     // Binding this to not loose context on router
//     this.haveSession = this.haveSession.bind(this);
//   }
//
//   haveSession(req, res, next) {
//     const token = this.getHeaderToken(req.headers.authorization);
//     this.token = Token.get(token);
//     if (this.isActive()) {
//       // Add to the request a session object with user and all session information
//       //
//       req.session = {
//         token: this,
//         user: usersController.get(this.token.userId),
//       };
//       next();
//     } else {
//       next({
//         status: 403,
//         message: 'You need to be logged',
//       });
//     }
//   }
//
//   static getHeaderToken(bearer) {
//     return bearer.split(' ')[1];
//   }
//
//   static havePermissions(req, res, next) {
//     // Validate if the user can do this action
//     // hint: can take the route to make sure about which is the action
//     //
//     // req.session.user.canDo('edit')
//   }
//
//
//   static isActive() {
//     // Compare the current datetime with the one from the token and the expiration
//     // in case is out of the time scope, return false and deactivate the Token
//     //
//     const now = new Date();
//     if (now + this.token.expires > this.token.createdAt + this.token.expires) {
//       this.token.deactive();
//       return false;
//     }
//     return true;
//   }
// }
//
// const register = (req, res, next) => {
//   // Crear usuario
//   const user = usersController.create(req);
//   const date = new Date();
//
//   // Crear el token
//   bcrypt.hash(`${req.body.username}${req.body.password}${date}`, process.env.SECRET, (err, hash) => {
//     Token.create({
//       token: hash,
//       createdAt: new Date(),
//       expires: 12,
//       status: 1,
//       userId: user.id,
//     });
//   });
//   res.send(Token).status(201); // se Tiene que regresar el token
//   next();
// };
//
// const login = (req, res, next) => {
//   // Obtener el usuario
//   const user = User.get(req.body.id);
//   const date = new Date();
//
//
//   // Crear el token
//   bcrypt.hash(`${req.body.username}${req.body.password}${date}`, process.env.SECRET, (err, hash) => {
//     Token.create({
//       token: hash,
//       createdAt: new Date(),
//       expires: 12,
//       status: 1,
//       userId: user.id,
//     });
//   });
//   res.send(Token).status(201); // se Tiene que regresar el token
//   next();
// };

// module.exports = new Auth();
// module.exports = register;
// module.exports = login;

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
