const bcrypt = require('bcrypt');
const { Token, User, Email } = require('../models');
const roleAccess = require('./permissions');
const emailer = require('../mail');

const CONFIRM_EMAIL_TYPE = 'ce';
const SESSION_TYPE = 's';
const PASS_RECOVERY_TYPE = 'r';

class Auth {
  static async sessionChecker(req, res, next) {
    const token = await Token.getActiveTokenByHash(req.query.hash, SESSION_TYPE);

    if (!Auth.isCurrentlyActive(token)) {
      res.locals.user = { userType: 3 };
      next();
    } else {
      res.locals.user = await User.get(token.userId);
      next();
    }
  }

  static async havePermissions(req, res, next) {
    const { userType } = res.locals.user;
    const { method } = req;
    const url = req.originalUrl;

    const roleMethods = roleAccess[userType];

    if (!roleMethods) {
      next({
        status: 403,
        message: 'User doesnt have access',
      });
    } else {
      const routeArray = roleMethods[method];

      if (!routeArray) {
        next({
          status: 403,
          message: 'User doesnt have access',
        });
      } else {
        const canAccess = routeArray.some(route => route.test(url));

        if (!canAccess) {
          next({
            status: 403,
            message: 'User doesnt have access',
          });
        } else {
          next();
        }
      }
    }
  }

  static async register(req, res) {
    const hash = await Auth.generateToken(res.locals.user, CONFIRM_EMAIL_TYPE);

    const options = {
      from: '"Foraneos UDG Team" <info@foraneos-udg.tk>',
      to: res.locals.user.mainEmail,
      subject: 'Confirmation Email ✔',
      text: 'Presiona Para Confirmar',
      html: `<p>Presiona
      <a href="http://localhost:3000/api/auth/confirmEmail?hash=${hash}&emailId=${res.locals.user.mainEmailId}">
      aqui</a> para activar tu correo</p>`,
    };
    emailer.sendMail(options);

    res.send({
      user: res.locals.user,
    });
  }

  static async reqConfirmEmail(req, res) {
    const hash = await Auth.generateToken(res.locals.user, CONFIRM_EMAIL_TYPE);

    res.locals.user.emails.forEach((email) => {
      if (email.verified === 1) {
        const options = {
          from: '"Foraneos UDG Team" <info@foraneos-udg.tk>',
          to: email.email,
          subject: 'Confirmation Email ✔',
          text: 'Presiona Para Confirmar',
          html: `<p>Presiona
          <a href="http://localhost:3000/api/auth/confirmEmail?hash=${hash}&emailId=${res.locals.email.id}">
          aqui</a> para activar tu correo</p>`,
        };
        emailer.sendMail(options);
      }
    });

    res.send({
      status: 200,
      message: 'Email sended',
    });
  }

  static async confirmEmail(req, res, next) {
    const token = await Token.getActiveTokenByHash(req.query.hash,
      CONFIRM_EMAIL_TYPE);

    if (!Auth.isCurrentlyActive(token)) {
      // Revisar que error poner si no se encuentra un token de confirmacion de correo
      next({
        status: 401,
        message: 'Token not active',
      });
    } else {
      const email = await Email.get(req.body.emailId);

      if (email === 0) {
        next({
          status: 404,
          message: 'Email not found',
        });
      } else if (email.userId !== token.userId) {
        next({
          status: 401,
          message: 'The email doesnt belong to the user',
        });
      } else {
        await Email.verifyEmail(email.id);
        await Token.deactivate(token.id);
        res.send({
          status: 200,
          message: 'Email confirmed',
        });
      }
    }
  }

  static async login(req, res, next) {
    const userId = await User.checkEmailPass(req.body);

    if (userId === 0) {
      next({
        status: 401,
        message: 'Email or Password incorrect',
      });
    } else {
      const token = await Token.getActiveToken(userId, SESSION_TYPE);

      if (!Auth.isCurrentlyActive(token)) {
        const user = await User.get(userId);

        console.log('Generando');
        console.time('generate');
        const hash = await Auth.generateToken(user,
          SESSION_TYPE);
        console.timeEnd('generate');

        res.send({
          hash,
          status: 200,
          message: 'Session started',
        });
      } else {
        res.send({
          hash: token.hash,
          status: 200,
          message: 'Session started',
        });
      }
    }
  }

  static async logout(req, res) {
    const { user } = res.locals;

    const token = await Token.getActiveToken(user.id, SESSION_TYPE);

    if (token !== 0) {
      await Token.deactivate(token.id);
    }

    res.send({
      status: 200,
      message: 'Session finished',
    });
  }

  static async reqPassRecovery(req, res, next) {
    const user = await User.getByEmail(req.query);

    if (user === 0) {
      next({
        status: 401,
        message: 'User doesnt exist',
      });
    } else {
      const hash = await Auth.generateToken(user, PASS_RECOVERY_TYPE);

      const options = {
        from: '"Foraneos UDG Team" <info@foraneos-udg.tk>',
        to: user.mainEmail,
        subject: 'Recovery Account Email ✔',
        text: 'Presiona Para Confirmar',
        html: `<p>Presiona
        <a href="http://localhost:3000/api/auth/passwordRecovery?hash=${hash}">
        aqui</a> para recuperar tu contraseña</p>`,
      };
      emailer.sendMail(options);

      res.send({
        status: 200,
        message: 'Email sended',
      });
    }
  }

  static async passRecovery(req, res, next) {
    const token = await Token.getActiveTokenByHash(req.query.hash, PASS_RECOVERY_TYPE);

    if (!Auth.isCurrentlyActive(token)) {
      next({
        status: 401,
        message: 'Token not active',
      });
    } else {
      await Token.deactivate(token.id);
      await User.patch(token.userId, { password: req.body.password });

      res.send({
        status: 200,
        message: 'Password changed',
      });
    }
  }

  static async generateToken({ username, id }, type) {
    let hash = '';

    const createdAt = new Date();
    const expires = createdAt;

    if (type === CONFIRM_EMAIL_TYPE) {
      expires.setYear((expires.getFullYear() + 5));
    } else if (type === SESSION_TYPE) {
      expires.setHours((expires.getHours() + 1));
    } else if (type === PASS_RECOVERY_TYPE) {
      expires.setMinutes((expires.getMinutes() + 10));
    }

    const key = `${username}${createdAt}`;

    hash = await bcrypt.hash(key, Number(process.env.SECRET));

    await Token.create({
      hash,
      createdAt,
      expires,
      type,
      userId: id,
    });

    return hash;
  }

  static isCurrentlyActive(token) {
    if (token === 0) {
      return false;
    }

    const time = new Date();
    if (time > token.expires) {
      Token.deactivate(token.id);
      return false;
    }
    return true;
  }
}

module.exports = Auth;
