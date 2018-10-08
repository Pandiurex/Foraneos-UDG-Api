const db = require('../db');

class Email {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.email = data.email;
    this.verified = data.verified;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(emailId) {
    let emailTbl = '';

    try {
      emailTbl = await db.select('email', '',
        [{ col: 'id', oper: '=', val: emailId }]);
    } catch (e) {
      return 0;
    }

    const email = this.processResult(emailTbl)[0];

    return email;
  }

  static async create({ userId, email }) {
    let emailId = '';

    try {
      emailId = await db.insert('email',
        ['userId', 'email'],
        [userId, email]);
    } catch (e) {
      return 0;
    }

    return this.get(emailId);
  }

  static async remove(emailId) {
    const email = this.get(emailId);

    if (email === 0) {
      return 0;
    }

    try {
      await db.delete('email',
        [{ col: 'id', oper: '=', val: emailId }]);
    } catch (e) {
      return 1;
    }

    return email;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Email(obj));
    });
    return this.result;
  }
}

module.exports = Email;
