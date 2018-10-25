const db = require('../db');

class Token {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.hash = data.hash;
    this.createdAt = data.ceatedAt;
    this.expires = data.expires;
    this.type = data.type;
    this.status = data.status;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  /**
   * [get description]
   * @param  {[type]} userId [description]
   * @return {[type]}        [description]
   */
  static async get(userId) {
    let tokenTbl = '';
    try {
      tokenTbl = await db.selectAll('token',
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
    return token;
  }

  static async getActiveToken(userId, tokenType) {
    let tokenTbl = '';
    try {
      tokenTbl = await db.selectAll('token',
        [{ col: 'userId', oper: '=', val: userId },
          {
            logic: 'AND',
            col: 'status',
            oper: '=',
            val: '1',
          },
          {
            logic: 'AND',
            col: 'type',
            oper: '=',
            val: tokenType,
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
    return token;
  }

  static async getAll() {
    let tokenTbl = '';
    try {
      tokenTbl = await db.selectAll('token');
    } catch (e) {
      return '';
    }

    const token = this.processResult(tokenTbl);

    return token;
  }

  static async create(
    {
      hash, createdAt, expires, type, userId,
    },
  ) {
    let tokenId = '';
    try {
      tokenId = await db.insert('token',
        ['hash', 'createdAt', 'type', 'expires', 'userId'],
        [hash, createdAt, type, expires, userId]);
    } catch (e) {
      return '';
    }

    return tokenId;
  }

  /**
   * Check the column status and returns its value
   * @param  {[type]} ntoken [description]
   * @return {[type]}        status
   */
  static async active(ntoken) {
    let tokenTbl = '';
    try {
      tokenTbl = await db.selectAll('token',
        [{ col: 'hash', oper: '=', val: ntoken }]);
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
