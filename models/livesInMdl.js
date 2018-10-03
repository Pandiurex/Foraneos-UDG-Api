const db = require('../db');
const LivesIn = require('./livesIn');

class livesInMdl {
  static async get(livesInId) {
    const livesInTbl = await db.select('lives_in', '',
      [{ col: 'id', oper: '=', val: livesInId }]);

    const livesIn = this.processResult(livesInTbl)[0];

    const userFullnameTbl = await db.select('user',
      ['name', 'firstSurname', 'secondSurname'],
      [{ col: 'id', oper: '=', val: livesIn.userId }]);

    livesIn.setUserFullname(
      userFullnameTbl[0].name,
      userFullnameTbl[0].firstSurname,
      userFullnameTbl[0].secondSurname,
    );

    const locationStreetTbl = await db.select('location',
      ['street', 'extNum'],
      [{ col: 'id', oper: '=', val: livesIn.locationId }]);

    livesIn.setLocationStreet(locationStreetTbl[0].street);
    livesIn.setLocationExtNum(locationStreetTbl[0].extNum);

    return JSON.stringify(livesIn);
  }

  static async getAll(userId = '', locationId = '') {
    let livesInTbl = '';

    if (userId !== '') {
      livesInTbl = await db.select('lives_in', '',
        [{ col: 'userId', oper: '=', val: userId }]);
    } else if (locationId !== '') {
      livesInTbl = await db.select('lives_in', '',
        [{ col: 'locationId', oper: '=', val: locationId }]);
    } else {
      livesInTbl = await db.select('lives_in');
    }

    const livesIn = this.processResult(livesInTbl);

    const myPromises = livesIn.map(async (data) => {
      const userFullnameTbl = await db.select('user',
        ['name', 'firstSurname', 'secondSurname'],
        [{ col: 'id', oper: '=', val: data.userId }]);

      data.setUserFullname(
        userFullnameTbl[0].name,
        userFullnameTbl[0].firstSurname,
        userFullnameTbl[0].secondSurname,
      );

      const locationStreetTbl = await db.select('location',
        ['street', 'extNum'],
        [{ col: 'id', oper: '=', val: data.locationId }]);

      data.setLocationStreet(locationStreetTbl[0].street);
      data.setLocationExtNum(locationStreetTbl[0].extNum);
    });

    await Promise.all(myPromises);

    return JSON.stringify(livesIn);
  }

  static async create(
    {
      userId, locationId, startDate, endDate,
    },
  ) {
    const livesInId = await db.insert('lives_in',
      ['userId', 'locationId', 'startDate', 'endDate'],
      [userId, locationId, startDate, endDate]);

    return this.get(livesInId);
  }

  static async updatePut(livesInId, { active, endDate }) {
    const columnsUpdate = [];

    if (active !== undefined) {
      columnsUpdate.push({ col: 'active', val: active });
    }

    if (endDate !== undefined) {
      columnsUpdate.push({ col: 'endDate', val: endDate });
    }

    await db.update('lives_ind', columnsUpdate,
      [{ col: 'id', oper: '=', val: livesInId }]);

    return this.get(livesInId);
  }

  static async updatePatch(livesInId, { active, endDate }) {
    const columnsUpdate = [];

    if (active !== undefined) {
      columnsUpdate.push({ col: 'active', val: active });

      await db.update('lives_ind', columnsUpdate,
        [{ col: 'id', oper: '=', val: livesInId }]);

      return JSON.stringify({ active });
    }

    if (endDate !== undefined) {
      columnsUpdate.push({ col: 'endDate', val: endDate });

      await db.update('lives_ind', columnsUpdate,
        [{ col: 'id', oper: '=', val: livesInId }]);

      return JSON.stringify({ endDate });
    }

    return '';
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new LivesIn(obj));
    });
    return this.result;
  }
}

module.exports = livesInMdl;
