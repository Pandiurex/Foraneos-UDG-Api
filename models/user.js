const db = require('../db');

class User {
  constructor(data) {
    this.id = data.id;
    this.mainEmailId = data.mainEmailId;
    this.active = data.active;
    this.userType = data.userType;
    this.username = data.username;
    this.password = data.password;
    this.name = data.name;
    this.firstSurname = data.firstSurname;
    this.secondSurname = data.secondSurname;
    this.profileImage = data.secondSurname;
    if (data.birthdate.getFullYear() !== undefined) {
      const year = data.birthdate.getFullYear();
      const month = data.birthdate.getMonth() + 1;
      const day = data.birthdate.getDate();

      this.birthdate = [year, month, day].join('-');
    } else {
      this.birthdate = data.birthdate;
    }
    this.gender = data.gender;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  setMainEmail(mainEmail) {
    this.mainEmail = mainEmail;
  }

  setEmails(emails) {
    this.emails = emails;
  }

  static async get(userId) {
    let userTbl = '';

    try {
      userTbl = await db.select('user', '',
        [{ col: 'id', oper: '=', val: userId }]);
    } catch (e) {
      return 0;
    }

    if (userTbl.length === 0) { return 0; }

    const user = this.processResult(userTbl)[0];

    const mainEmailTbl = await db.select('email', ['email'],
      [{ col: 'id', oper: '=', val: user.mainEmailId }]);

    user.setMainEmail(mainEmailTbl[0].email);

    const emailsTbl = await db.select('email',
      ['id', 'email', 'verified'],
      [{ col: 'userId', oper: '=', val: user.id }]);

    const emails = [];

    emailsTbl.forEach((data) => {
      const email = {
        id: data.id,
        email: data.email,
        verified: data.verified,
      };
      emails.push(email);
    });

    user.setEmails(emails);

    return user;
  }

  static async getAll() {
    const usersTbl = await db.selectAll('user');
    const users = this.processResult(usersTbl);

    const myPromises = users.map(async (data) => {
      const email = await db.select('email', ['email'],
        [{ col: 'id', oper: '=', val: `${data.mainEmailId}` }]);

      data.setMainEmail(email[0].email);
    });

    await Promise.all(myPromises);

    return users;
  }

  static async create(
    {
      userType, username, password, name,
      firstSurname, secondSurname, profileImage, birthdate,
      gender, mainEmail,
    },
  ) {
    let userId = 0;
    try {
      userId = await db.insert('user',
        ['userType', 'username', 'password', 'name',
          'firstSurname', 'secondSurname', 'profileImage', 'birthdate',
          'gender'],
        [userType, username, password, name,
          firstSurname, secondSurname, profileImage, birthdate,
          gender]);
    } catch (e) {
      return 0;
    }

    let mainEmailId = 0;
    try {
      mainEmailId = await db.insert('email', ['userId', 'email'],
        [userId, mainEmail]);
    } catch (e) {
      db.delete('user', [{ col: 'id', oper: '=', val: userId }]);
      return 1;
    }

    await db.update('user', [{ col: 'mainEmailId', val: mainEmailId }],
      [{ col: 'id', oper: '=', val: userId }]);

    return this.get(userId);
  }

  static async update(userId,
    {
      mainEmailId, userType, password, name,
      firstSurname, secondSurname, profileImage, birthdate,
      gender,
    }) {
    const columnsUpdate = [];

    if (mainEmailId !== undefined) {
      const emailTbl = await db.selectAll('email',
        [{ col: 'userId', oper: '=', val: userId }]);

      if (emailTbl.some(data => data.id === mainEmailId)) {
        columnsUpdate.push({ col: 'mainEmailId', val: mainEmailId });
      } else {
        return 1;
      }
    }

    if (userType !== undefined) {
      columnsUpdate.push({ col: 'userType', val: userType });
    }

    if (password !== undefined) {
      columnsUpdate.push({ col: 'password', val: password });
    }

    if (name !== undefined) {
      columnsUpdate.push({ col: 'name', val: name });
    }

    if (firstSurname !== undefined) {
      columnsUpdate.push({ col: 'firstSurname', val: firstSurname });
    }

    if (secondSurname !== undefined) {
      columnsUpdate.push({ col: 'secondSurname', val: secondSurname });
    }

    if (profileImage !== undefined) {
      columnsUpdate.push({ col: 'profileImage', val: profileImage });
    }

    if (birthdate !== undefined) {
      columnsUpdate.push({ col: 'birthdate', val: birthdate });
    }

    if (gender !== undefined) {
      columnsUpdate.push({ col: 'gender', val: gender });
    }

    try {
      await db.update('user', columnsUpdate,
        [{ col: 'id', oper: '=', val: userId }]);
    } catch (e) {
      return 0;
    }

    return this.get(userId);
  }

  static async patch(userId,
    {
      mainEmailId, userType, password, name,
      firstSurname, secondSurname, profileImage, birthdate,
      gender,
    }) {
    const columnsUpdate = [];
    let updated = '';

    if (mainEmailId !== undefined) {
      const emailTbl = await db.selectAll('email',
        [{ col: 'userId', oper: '=', val: userId }]);

      if (emailTbl.some(data => data.id === mainEmailId)) {
        columnsUpdate.push({ col: 'mainEmailId', val: mainEmailId });
      } else {
        return 1;
      }

      updated = { mainEmailId };
    }

    if (userType !== undefined) {
      columnsUpdate.push({ col: 'userType', val: userType });
      updated = { userType };
    }

    if (password !== undefined) {
      columnsUpdate.push({ col: 'password', val: password });
      updated = { password };
    }

    if (name !== undefined) {
      columnsUpdate.push({ col: 'name', val: name });
      updated = { name };
    }

    if (firstSurname !== undefined) {
      columnsUpdate.push({ col: 'firstSurname', val: firstSurname });
      updated = { firstSurname };
    }

    if (secondSurname !== undefined) {
      columnsUpdate.push({ col: 'secondSurname', val: secondSurname });
      updated = { secondSurname };
    }

    if (profileImage !== undefined) {
      columnsUpdate.push({ col: 'profileImage', val: profileImage });
      updated = { profileImage };
    }

    if (birthdate !== undefined) {
      columnsUpdate.push({ col: 'birthdate', val: birthdate });
      updated = { birthdate };
    }

    if (gender !== undefined) {
      columnsUpdate.push({ col: 'gender', val: gender });
      updated = { gender };
    }

    if (columnsUpdate.length !== 1) { return 2; }

    try {
      await db.update('user', columnsUpdate,
        [{ col: 'id', oper: '=', val: userId }]);
    } catch (e) {
      return 0;
    }

    return updated;
  }

  static async remove(userId) {
    try {
      await db.update('user', [{ col: 'active', val: 0 }],
        [{ col: 'id', oper: '=', val: userId }]);
    } catch (e) {
      return 0;
    }

    await db.update('location', [{ col: 'active', val: 0 }],
      [{ col: 'ownerUserId', oper: '=', val: userId }]);

    return this.get(userId);
  }

  static async haveaccess(method, url) {

  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new User(obj));
    });
    return this.result;
  }
}

module.exports = User;
