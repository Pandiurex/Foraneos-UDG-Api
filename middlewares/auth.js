const bcrypt = require('bcrypt');
const { Token, User, Email } = require('../models');
const roleAccess = require('./permissions');
const emailer = require('../mail');
const { hashPassword } = require('./general');

const CONFIRM_EMAIL_TYPE = 'ce';
const SESSION_TYPE = 's';
const PASS_RECOVERY_TYPE = 'r';

/**
 * Class that manages the authentication and authorization of the api
 */
class Auth {
  /**
   * Checks the session from the hash received in req
   * @param  {object}   req   Request form express package
   * @param  {object}   res   Response from express package
   * @param  {Function} next  Function that continues the middlewares processing
   * @return undefined        If the session exists saves the user, otherwise defines
   *                             the user like visitant
   */
  static async sessionChecker(req, res, next) {
    const token = await Token.getActiveTokenByHash(req.get('hash'), SESSION_TYPE);

    if (!Auth.isCurrentlyActive(token)) {
      res.locals.user = { userType: 3 };
      next();
    } else {
      res.locals.user = await User.get(token.userId);
      next();
    }
  }

  /**
   * Checks the permissions from the user received in sessionChecker
   * @param  {object}   req   Request form express package
   * @param  {object}   res   Response from express package
   * @param  {Function} next  Function that continues the middlewares processing
   * @return undefined        If the user has permissions continues with middlewares,
   *                             otherwise send an error message
   */
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

  /**
   * Checks in an user and creates a confirm_email token and sends it with emailer
   * @param  {object}   req   Request form express package
   * @param  {object}   res   Response from express package
   * @return undefined        Sends the created user
   */
  static async register(req, res) {
    const hash = await Auth.generateToken(res.locals.user, CONFIRM_EMAIL_TYPE);

    const options = {
      from: `"Foraneos UDG Team" <${process.env.MAIL_USER}>`,
      to: res.locals.user.mainEmail,
      subject: 'Confirmation Email ✔',
      text: 'Presiona Para Confirmar',
      html: `<p>Presiona
      <a href="${process.env.URL}/api/auth/confirmEmail?hash=${hash}&emailId=${res.locals.user.mainEmailId}">
      aqui</a> para activar tu correo</p>`,
    };
    emailer.sendMail(options);

    res.send({
      user: res.locals.user,
    });
  }

  /**
   * Creates a confirm_email token and sends it with emailer
   * @param  {object}   req   Request form express package
   * @param  {object}   res   Response from express package
   * @return undefined        Sends the correct response
   */
  static async reqConfirmEmail(req, res) {
    const hash = await Auth.generateToken(res.locals.user, CONFIRM_EMAIL_TYPE);

    res.locals.user.emails.forEach((email) => {
      if (email.verified === 1) {
        const options = {
          from: `"Foraneos UDG Team" <${process.env.MAIL_USER}>`,
          to: email.email,
          subject: 'Confirmation Email ✔',
          text: 'Presiona Para Confirmar',
          html: `<p>Presiona
          <a href="${process.env.URL}/api/auth/confirmEmail?hash=${hash}&emailId=${res.locals.email.id}">
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

  /**
   * Confirms the emailId and the hash received in query
   * @param  {object}   req   Request form express package
   * @param  {object}   res   Response from express package
   * @param  {Function} next  Function that continues the middlewares processing
   * @return undefined        If and error happens sends it, otherwise confirms the
   *                             email
   */
  static async confirmEmail(req, res, next) {
    const token = await Token.getActiveTokenByHash(req.query.hash,
      CONFIRM_EMAIL_TYPE);

    if (!Auth.isCurrentlyActive(token)) {
      next({
        status: 401,
        message: 'Token not active',
      });
    } else {
      const email = await Email.get(req.query.emailId);

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

  /**
   * If the email and password in req.body are correct, creates a session hash
   * @param  {object}   req   Request form express package
   * @param  {object}   res   Response from express package
   * @param  {Function} next  Function that continues the middlewares processing
   * @return undefined        If the email or password are incorrect returns an error,
   *                             otherwise returns a session hash
   */
  static async login(req, res, next) {
    const userId = await User.checkEmailPass(req.body);

    if (userId === 0) {
      next({
        status: 401,
        message: 'Email or Password incorrect',
      });
    } else {
      const token = await Token.getActiveToken(userId, SESSION_TYPE);
      const user = await User.get(userId);

      if (!Auth.isCurrentlyActive(token)) {
        const hash = await Auth.generateToken(user,
          SESSION_TYPE);

        res.send({
          hash,
          user: user.id,
          type: user.userType,
          status: 200,
          message: 'Session started',
        });
      } else {
        res.send({
          hash: token.hash,
          user: user.id,
          type: user.userType,
          status: 200,
          message: 'Session started',
        });
      }
    }
  }

  /**
   * Deactivates the session hash
   * @param  {object}   req   Request form express package
   * @param  {object}   res   Response from express package
   * @return undefined
   */
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

  /**
   * Creates a pass_recovery token and sends it in an email
   * @param  {object}   req   Request form express package
   * @param  {object}   res   Response from express package
   * @param  {Function} next  Function that continues the middlewares processing
   * @return undefined
   */
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
        from: `"Foraneos UDG Team" <${process.env.MAIL_USER}>`,
        to: user.mainEmail,
        subject: 'Recovery Account Email ✔',
        text: 'Presiona Para Confirmar',
        html: `<p>Presiona
        <a href="${process.env.URL_PASS}${hash}">
        aqui</a> para recuperar tu contraseña</p>`,
      };
      emailer.sendMail(options);

      res.send({
        status: 200,
        message: 'Email sended',
      });
    }
  }

  /**
   * Changes the password form the user
   * @param  {object}   req   Request form express package
   * @param  {object}   res   Response from express package
   * @param  {Function} next  Function that continues the middlewares processing
   * @return undefined        If the token is inactive sends an error
   */
  static async passRecovery(req, res, next) {
    const token = await Token.getActiveTokenByHash(req.body.hash, PASS_RECOVERY_TYPE);

    if (!Auth.isCurrentlyActive(token)) {
      next({
        status: 401,
        message: 'Token not active',
      });
    } else {
      await hashPassword(req);
      await Token.deactivate(token.id);
      await User.patch(token.userId, { password: req.body.password });

      res.send({
        status: 200,
        message: 'Password changed',
      });
    }
  }

  /**
   * Generates a token from the type received
   * @param  {string} options.username username from the user
   * @param  {number} options.id       id from the user
   * @param  {string} type             Type of token to create
   * @return {string}                  Returns the created hash
   */
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

  /**
   * Checks if a token is still active
   * @param  {string}  token Token to check
   * @return {Boolean}       Returns if the token is active
   */
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
