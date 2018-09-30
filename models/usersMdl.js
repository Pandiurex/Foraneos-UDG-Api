const db = require('../db');
const User = require('./user');

class UsersMdl {
  static async get(userId) {
    const userTbl = await db.select('user', '',
      [{ col: 'id', oper: '=', val: userId }]);
    const user = this.processResult(userTbl)[0];

    const mainEmailTbl = await db.select('email', ['email'],
      [{ col: 'id', oper: '=', val: user.main_email_id }]);

    user.setMainEmail(mainEmailTbl[0].email);

    const secondaryEmailsTbl = await db.select('email', ['email'],
      [{ col: 'userId', oper: '=', val: user.id }]);

    const secondaryEmails = [];

    secondaryEmailsTbl.forEach((data) => {
      if (data.email !== user.mainEmail) {
        secondaryEmails.push(data.email);
      }
    });

    user.setSecondaryEmails(secondaryEmails);

    return JSON.stringify(user);
  }

  static async getAll() {
    const resultsUser = await db.selectAll('user');
    const resultProcessed = this.processResult(resultsUser);

    const myPromises = resultProcessed.map(async (data) => {
      const email = await db.select('email', ['email'],
        [{ col: 'id', oper: '=', val: `${data.main_email_id}` }]);

      data.setMainEmail(email[0].email);
    });

    await Promise.all(myPromises);

    return JSON.stringify(resultProcessed);
  }

  static async create(
    {
      userType, username, password, mainEmail,
    },
  ) {
    const userId = await db.insert('user', ['userType', 'username', 'password'],
      [userType, username, password]);

    const mainEmailId = await db.insert('email', ['userId', 'email'],
      [userId, mainEmail]);

    await db.update('user', [{ col: 'mainEmailId', val: mainEmailId }],
      [{ col: 'id', oper: '=', val: userId }]);

    return this.get(userId);
  }

  static async remove(userId) {

  }

  static async update(userId,
    {
      userType, username, password, mainEmailId,
    }) {
    const columnsUpdate = [];

    if (userType !== undefined) {
      columnsUpdate.push(
        { col: 'userType', val: userType },
      );
    }

    if (username !== undefined) {
      columnsUpdate.push(
        { col: 'username', val: username },
      );
    }

    if (password !== undefined) {
      columnsUpdate.push(
        { col: 'password', val: password },
      );
    }

    if (mainEmailId !== undefined) {
      const emailTbl = await db.selectAll('email',
        [{ col: 'userId', oper: '=', val: userId }]);

      if (emailTbl.some(data => data.id === mainEmailId)) {
        columnsUpdate.push(
          { col: 'mainEmailId', val: mainEmailId },
        );
      } else {
        // Aqui va un error todo chido
        return this.get(userId);
      }
    }

    await db.update('user', columnsUpdate,
      [{ col: 'id', oper: '=', val: userId }]);

    return this.get(userId);
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new User(obj));
    });
    return this.result;
  }
}

module.exports = UsersMdl;
