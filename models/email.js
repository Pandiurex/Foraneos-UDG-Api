const db = require('../db');

// FIXME Todas las funciones deben estar documentadas
// FIXME En lugar de regresar un numero sin significado (cero cuando hay error), minimo una constante para codigos de errores y dejarlo documentado

class Email {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.email = data.email;
    this.verified = data.verified;

    // FIXME Para que estan quitando los keys undefined? no seria mas bien responsabilidad no definirlos o dejar un valor default desde aqui en el constructor?
    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(emailId) {
    let emailTbl = '';

    try {
      emailTbl = await db.selectAll('email',
        [{ col: 'id', oper: '=', val: emailId }]);
    } catch (e) {
      return 0;
    }

    if (emailTbl.length === 0) { return 0; }

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
