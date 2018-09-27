const db = require('../db');
const User = require('./user');

class UsersMdl {
  async get(userId) {
    this.dbResults = db.get('*', 'user', 'id', userId);
  }

  async getAll() {
    this.resultsUser = await db.getAll('user');
    this.processResult(this.resultsUser);

    const resultEnd = new Promise((resolve, reject) => {
      this.result.forEach(async (data) => {
        const email = await db.get('email', ['email'],
          [{ col: 'id', oper: '=', val: `${data.main_email_id}` }]);

        data.setMainEmail(email[0].email);
        console.log('Dentro');
      });
      if (this.result.length === 0) throw reject();
      resolve(this.result);
    }).then(console.log('Fuera'));

    return JSON.stringify(resultEnd);
  }

  async insert() {

  }

  async remove(userId) {

  }

  processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new User(obj));
    });
    return this.result;
  }
}

module.exports = new UsersMdl();
