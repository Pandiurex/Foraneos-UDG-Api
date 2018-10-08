const db = require('../db');

class LivesIn {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.locationId = data.locationId;
    this.active = data.active;
    if (data.startDate.getFullYear() !== undefined) {
      const year = data.startDate.getFullYear();
      const month = data.startDate.getMonth();
      const day = data.startDate.getDay();

      this.startDate = [year, month, day].join('-');
    } else {
      this.startDate = data.startDate;
    }
    if (data.endDate.getFullYear() !== undefined) {
      const year = data.endDate.getFullYear();
      const month = data.endDate.getMonth();
      const day = data.endDate.getDay();

      this.endDate = [year, month, day].join('-');
    } else {
      this.endDate = data.endDate;
    }
    this.rated = data.rated;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  setUserFullname(name, firstSurname, secondSurname) {
    this.userFullname = `${name} ${firstSurname} ${secondSurname}`;
  }

  setLocationStreet(street) {
    this.locationStreet = street;
  }

  setLocationExtNum(extNum) {
    this.locationExtNum = extNum;
  }

  static async get(livesInId) {
    let livesInTbl = '';

    try {
      livesInTbl = await db.select('lives_in', '',
        [{ col: 'id', oper: '=', val: livesInId }]);
    } catch (e) {
      return 0;
    }

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

    return livesIn;
  }

  static async getAll(userId = '', locationId = '') {
    let livesInTbl = '';

    try {
      if (userId !== '') {
        livesInTbl = await db.select('lives_in', '',
          [{ col: 'userId', oper: '=', val: userId }]);
      } else if (locationId !== '') {
        livesInTbl = await db.select('lives_in', '',
          [{ col: 'locationId', oper: '=', val: locationId }]);
      } else {
        livesInTbl = await db.select('lives_in');
      }
    } catch (e) {
      return 0;
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

    return livesIn;
  }

  static async create(
    {
      userId, locationId, startDate, endDate,
    },
  ) {
    let livesInId = '';

    try {
      livesInId = await db.insert('lives_in',
        ['userId', 'locationId', 'startDate', 'endDate'],
        [userId, locationId, startDate, endDate]);
    } catch (e) {
      return 0;
    }

    const availableRoomsTbl = await db.select('location',
      ['availableRooms'],
      [{ col: 'id', oper: '=', val: 'locationId' }]);

    let { availableRooms } = availableRoomsTbl[0];

    availableRooms -= 1;

    await db.update('location',
      [{ col: 'availableRooms', val: availableRooms }],
      [{ col: 'id', oper: '=', val: 'locationId' }]);

    return this.get(livesInId);
  }

  static async update(livesInId, { active, endDate }) {
    const columnsUpdate = [];

    if (active !== undefined) {
      columnsUpdate.push({ col: 'active', val: active });
    }

    if (endDate !== undefined) {
      columnsUpdate.push({ col: 'endDate', val: endDate });
    }

    try {
      await db.update('lives_ind', columnsUpdate,
        [{ col: 'id', oper: '=', val: livesInId }]);
    } catch (e) {
      return 0;
    }

    return this.get(livesInId);
  }

  static async patch(livesInId, { active, endDate }) {
    const columnsUpdate = [];
    let updated = '';

    if (active !== undefined) {
      columnsUpdate.push({ col: 'active', val: active });
      updated = { active };
    }

    if (endDate !== undefined) {
      columnsUpdate.push({ col: 'endDate', val: endDate });
      updated = { endDate };
    }

    try {
      await db.update('lives_ind', columnsUpdate,
        [{ col: 'id', oper: '=', val: livesInId }]);
    } catch (e) {
      return 0;
    }

    return updated;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new LivesIn(obj));
    });
    return this.result;
  }
}

module.exports = LivesIn;
