const db = require('../db');

class Message {
  constructor(data) {
    this.id = data.id;
    this.senderUserId = data.senderUserId;
    this.locationId = data.locationId;
    this.viewed = data.viewed;
    this.message = data.message;
    if (data.time.getFullYear() !== undefined) {
      const year = data.time.getFullYear();
      const month = data.time.getMonth();
      const day = data.time.getDay();
      const hour = data.time.getHours();
      const minute = data.time.getMinutes();
      const second = data.time.getSeconds();

      this.time = [year, month, day].join('-');
      this.time += ' ';
      this.time = [hour, minute, second].join(':');
    } else {
      this.time = data.time;
    }

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

  static async get(messageId) {
    let messageTbl = '';
    try {
      messageTbl = await db.select('message', '',
        [{ col: 'id', oper: '=', val: messageId }]);
    } catch (e) {
      return 0;
    }

    const message = this.processResult(messageTbl)[0];

    const userFullnameTbl = await db.select('user',
      ['name', 'firstSurname', 'secondSurname'],
      [{ col: 'id', oper: '=', val: message.senderUserId }]);

    message.setUserFullname(
      userFullnameTbl[0].name,
      userFullnameTbl[0].firstSurname,
      userFullnameTbl[0].secondSurname,
    );

    const locationStreetTbl = await db.select('location',
      ['street', 'extNum'],
      [{ col: 'id', oper: '=', val: message.locationId }]);

    message.setLocationStreet(locationStreetTbl[0].street);
    message.setLocationExtNum(locationStreetTbl[0].extNum);

    return message;
  }

  static async getAll(locationId) {
    let messagesTbl = '';
    try {
      messagesTbl = await db.select('message',
        { col: 'locationId', oper: '=', val: locationId });
    } catch (e) {
      return 0;
    }

    const messages = this.processResult(messagesTbl);

    const myPromises = messages.map(async (data) => {
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

    return messages;
  }

  static async create(
    {
      senderUserId, locationId, message, time,
    },
  ) {
    let messageId = '';
    try {
      messageId = await db.insert('message',
        ['senderUserId', 'locationId', 'message', 'time'],
        [senderUserId, locationId, message, time]);
    } catch (e) {
      return 0;
    }

    return this.get(messageId);
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Message(obj));
    });
    return this.result;
  }
}

module.exports = Message;
