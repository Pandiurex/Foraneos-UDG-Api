const db = require('../db');

class Token {
  constructor(data) {
    this.id = data.id;
    this.token = data.token;
    this.createdAt = data.ceatedAt;
    this.expires = new Date(data.createdAt.getTime() + data.duration * 60);
    this.type = data.type;
    this.status = data.status;
    this.userId = data.userId;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(userId) {
    let tokenTbl = '';
    try {
      tokenTbl = await db.select('token', ['token'],
        [{ col: 'userId', oper: '=', val: userId },
          {
            logic: 'AND',
            col: 'status',
            oper: '=',
            val: '1',
          }]);
    } catch (e) {
      return '';
    }

    if (tokenTbl.length === 0) {
      // //Crear token
      return 0;
    }
    const token = this.processResult(tokenTbl)[0];
    // Retornar el token obtenido
    return JSON.stringify(token);
  }

  static async getAll() {
    let tokenTbl = '';
    try {
      tokenTbl = await db.selectAll('token');
    } catch (e) {
      return '';
    }

    const token = this.processResult(tokenTbl);

    return JSON.stringify(token);
  }

  static async create(
    {
      token, createdAt, expires, type, status, userId,
    },
  ) {
    let tokenId = '';
    try {
      tokenId = await db.insert('token',
        ['token', 'createdAt', 'type', 'expires', 'status', 'userId'],
        [token, createdAt, type, expires, status, userId]);
    } catch (e) {
      return '';
    }

    return this.get(tokenId);
  }

  /**
   * Check the column status and returns its value
   * @param  {[type]} ntoken [description]
   * @return {[type]}        status
   */
  static async active(ntoken) {
    let tokenTbl = '';
    try {
      tokenTbl = await db.select('token', '',
        [{ col: 'token', oper: '=', val: ntoken }]);
    } catch (e) {
      return '';
    }

    if (tokenTbl.length === 0) { return 0; }

    const token = this.processResult(tokenTbl)[0];

    return token.status;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Token(obj));
    });
    return this.result;
  }
}

module.exports = Token;
