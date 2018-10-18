const db = require('../db');

class Token {
  constructor(data) {
    this.id = data.id;
    this.nToken = data.token;
    this.createAt = data.ceatedAt;
    this.expire = data.expires;
    this.expire = data.type;
    this.status = data.status;
    this.userId = data.userId;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(tokenId) {
    let tokenTbl = '';
    try {
      tokenTbl = await db.select('token', '',
        [{ col: 'id', oper: '=', val: tokenId }]);
    } catch (e) {
      return '';
    }

    if (tokenTbl.length === 0) { return 0; }

    const token = this.processResult(tokenTbl)[0];

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
