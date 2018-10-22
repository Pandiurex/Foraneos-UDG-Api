const bcrypt = require('bcrypt');
const { Token } = require('../models');
const { User } = require('../models');

class Auth {
  static async generateToken(user) {
    this.key = `${user.username}`;
    console.log(this.key);
    await bcrypt.genSalt(5, (err, salt) => {
      bcrypt.hash(this.key, salt, (hashErr, hash) => {
        Token.create({
          token: hash,
          createdAt: new Date(),
          expires: new Date(),
          type: 's',
          status: 1,
          userId: user.id,
        })
          .then(() => hash)
          .catch((e) => {
            console.error(`.catch(${hashErr})`);
            throw e;
          });
      });
    }).catch((err) => { throw err; });
  }

  async register(req, res, next) {
    bcrypt(`${req.body.password}`, process.env.SECRET, (err, hash) => {
      req.body.password = hash;
    });
    this.newUser = new User({ ...req.body });
    try {
      await this.newUser.create();
      this.token = Auth.generateToken(this.newUser);
      res.send(this.token);
      next({
        token: this.token,
        user: this.newUser,
      });
    } catch (e) {
      console.error(`.catch(${e})`);
      next(e);
    }
  }

  static async login(req, res, next) {
    const user = JSON.parse(JSON.stringify(await User.get('*', `${req.body.username}`)));
    if (user.username !== undefined) {
      const data = {
        user: user.username,
        token: null,
      };
      const active = await Token.active(data);
      if (active === 0) {
        res.send(await Auth.generateToken(user));
        next();
      } else {
        next();
      }
    }
  }

  logout(token, next) {
    this.statusToken = Token.get(token);
    if (this.statusToken) {
      Token.destroy(token)
        .then(() => next())
        .catch((e) => {
          console.error(`.catch(${e})`);
          next(e);
        });
    }
  }

  haveSession(req, res, next) {
    const token = this.getHeaderToken(req.headers.authorization);
    this.token = Token.get(token);
    if (this.isActive()) {
      req.session = {
        token: this.token,
        user: User.get(this.token.userId),
      };
      next();
    } else {
      next({
        status: 403,
        message: 'You need to loggin',
      });
    }
  }

  havePermission(req, res, next) {
    this.method = req.method;
    if (req.session.User.haveaccess(this.method, req.originalUrl)) {
      next();
    } else {
      res.send('NON authorization');
    }
  }

  isActive() {
    const time = new Date();
    if (time > this.token.createdAt + this.token.expires) {
      this.token.destroy();
      return false;
    }
    return true;
  }

  getHeaderToken(bearer) {
    //  obtenemos token
    return this.bearer.split(' ')[1];
  }
}
module.exports = {
  Auth,
};

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
