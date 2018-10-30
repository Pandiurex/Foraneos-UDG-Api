const bcrypt = require('bcrypt');
const { Token } = require('../models');
const { User, Email } = require('../models');
const emailer = require('../mail');

const CONFIRM_EMAIL_TYPE = 'ce';
const SESSION_TYPE = 's';
const PASS_RECOVERY_TYPE = 'r';

class Auth {
  static async sessionChecker(req, res, next) {
    const token = await Token.getActiveTokenByHash(req.query.hash, SESSION_TYPE);

    if (!Auth.isCurrentlyActive(token)) {
      const result = {
        error: {
          status: 400,
          message: 'Session invalid',
        },
      };
      res.status(400).send(result);
    } else {
      res.locals = { user: await User.get(token.userId) };
      next();
    }
  }

  static async register(req, res) {
    const hash = await Auth.generateToken(res.locals.user, CONFIRM_EMAIL_TYPE);

    console.log('Confirm email hash created');
    console.log(hash);
    console.log(res.locals);
    const options = {
      from: '"Foraneos UDG Team" <info@foraneos-udg.tk>', // sender address
      to: 'crissin21_01@hotmail.com', // list of receivers
      subject: 'Confirmation Email ✔', // Subject line
      text: 'Presiona Para Confirmar',
      html: `<p>Presiona
      <a href="http://localhost:3000/api/auth/confirmEmail?hash=${hash}&emailId=${res.locals.user.mainEmailId}">
      aqui</a> para activar tu correo</p>`, // html body
    };
    emailer.sendMail(options);

    res.send({
      user: res.locals.user,
    });
    // Enviar por email la url con el hash de confirmacion
    // de correo y el id del correo a confirmar
  }

  static async confirmEmail(req, res) {
    const token = await Token.getActiveTokenByHash(req.query.hash);

    if (!Auth.isCurrentlyActive(token)) {
      // Revisar que error poner si no se encuentra un token de confirmacion de correo
      const result = {
        error: {
          status: 401,
          message: 'Token not active',
        },
      };
      res.status(401).send(result);
    } else {
      const email = await Email.get(req.query.emailId);

      if (email === 0) {
        const result = {
          error: {
            status: 404,
            message: 'Email not found',
          },
        };
        res.status(404).send(result);
      } else {
        await Email.verifyEmail(email.id);
        await Token.deactivate(token.id);
        res.send();
      }
    }
  }

  static async login(req, res) {
    const userId = await User.checkUsernamePass(req.query);

    if (userId === 0) {
      const result = {
        error: {
          status: 401,
          message: 'Username or Password incorrect',
        },
      };
      res.status(401).send(result);
    } else {
      const token = await Token.getActiveToken(userId, SESSION_TYPE);

      if (!Auth.isCurrentlyActive(token)) {
        const user = await User.get(userId);

        const hash = await Auth.generateToken(user,
          SESSION_TYPE);

        res.send({
          hash,
        });
      } else {
        res.send({
          hash: token.hash,
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
    const result = {
      message: {
        status: 200,
        message: 'Session finished',
      },
    };
    res.send(result);
  }

  static async reqPassRecovery(req, res) {
    const user = await User.getByUsername(req.query);

    const hash = await Auth.generateToken(user, PASS_RECOVERY_TYPE);

    console.log('Request password recovery hash created');
    console.log(hash);

    // Enviar por email la url con el hash de recuperacion de contraseña

    const result = {
      message: {
        status: 200,
        message: 'Email sended',
      },
    };
    res.send(result);
  }

  static async passRecovery(req, res) {
    const token = await Token.getActiveTokenByHash(req.query.hash, PASS_RECOVERY_TYPE);

    if (!Auth.isCurrentlyActive(token)) {
      const result = {
        error: {
          status: 401,
          message: 'Token not active',
        },
      };
      res.status(401).send(result);
    } else {
      // await Token.deactivate(token.id);
      await User.patch(token.userId, { password: req.query.password });

      const result = {
        message: {
          status: 200,
          message: 'Password changed',
        },
      };

      res.send(result);
    }
  }

  static async generateToken({ username, id }, type) {
    let hash = '';

    const createdAt = new Date();
    const expires = createdAt;

    if (type === CONFIRM_EMAIL_TYPE) {
      expires.setYear((expires.getYear() + 100));
    } else if (type === SESSION_TYPE) {
      expires.setHours((expires.getHours() + 1));
    } else if (type === PASS_RECOVERY_TYPE) {
      expires.setMinutes((expires.getMinutes() + 10));
    }

    const key = `INCIO ${username}${createdAt} FINAL`;

    hash = bcrypt.hashSync(key, Number(process.env.SECRET));

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
