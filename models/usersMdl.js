const db = require('../db');
const User = require('./user');

class UsersMdl {
  static async get(userId) {
    const userTbl = await db.select('user', '',
      [{ col: 'id', oper: '=', val: userId }]);
    const user = this.processResult(userTbl)[0];

    const mainEmailTbl = await db.select('email', ['email'],
      [{ col: 'id', oper: '=', val: user.mainEmailId }]);

    user.setMainEmail(mainEmailTbl[0].email);

    const secondaryEmailsTbl = await db.select('email',
      ['id', 'email'],
      [{ col: 'userId', oper: '=', val: user.id },
        {
          logic: 'AND', col: 'id', oper: '!=', val: user.mainEmailId,
        },
      ]);

    const secondaryEmails = [];

    secondaryEmailsTbl.forEach((data) => {
      const secondaryEmail = {
        id: data.id,
        email: data.email,
      };
      secondaryEmails.push(secondaryEmail);
    });

    user.setSecondaryEmails(secondaryEmails);

    return JSON.stringify(user);
  }

  static async getAll() {
    const resultsUser = await db.selectAll('user');
    const resultProcessed = this.processResult(resultsUser);

    const myPromises = resultProcessed.map(async (data) => {
      const email = await db.select('email', ['email'],
        [{ col: 'id', oper: '=', val: `${data.mainEmailId}` }]);

      data.setMainEmail(email[0].email);
    });

    await Promise.all(myPromises);

    return JSON.stringify(resultProcessed);
  }

  static async create(
    {
      userType, username, password, name,
      firstSurname, secondSurname, profileImage, birthYear,
      birthMonth, birthDay, gender, mainEmail,
    },
  ) {
    const birthdate = `${birthYear}-${birthMonth}-${birthDay}`;

    const userId = await db.insert('user',
      ['userType', 'username', 'password', 'name',
        'firstSurname', 'secondSurname', 'profileImage', 'birthdate',
        'gender'],
      [userType, username, password, name,
        firstSurname, secondSurname, profileImage, birthdate,
        gender]);

    const mainEmailId = await db.insert('email', ['userId', 'email'],
      [userId, mainEmail]);

    await db.update('user', [{ col: 'mainEmailId', val: mainEmailId }],
      [{ col: 'id', oper: '=', val: userId }]);

    const user = new User({
      id: userId,
      mainEmailId,
      userType,
      username,
      password,
      name,
      firstSurname,
      secondSurname,
      profileImage,
      birthYear,
      birthMonth,
      birthDay,
      gender,
    });

    user.setMainEmail(mainEmail);

    return JSON.stringify(user);
  }

  static async remove(userId) {

  }

  static async update(userId,
    {
      mainEmailId, userType, password, name,
      firstSurname, secondSurname, profileImage, birthYear,
      birthMonth, birthDay, gender,
    }) {
    const columnsUpdate = [];

    if (mainEmailId !== undefined) {
      const emailTbl = await db.selectAll('email',
        [{ col: 'userId', oper: '=', val: userId }]);

      if (emailTbl.some(data => data.id === mainEmailId)) {
        columnsUpdate.push({ col: 'mainEmailId', val: mainEmailId });
      } else {
        // Aqui va un error todo chido
        return this.get(userId);
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

    if (birthDay !== undefined && birthMonth !== undefined && birt !== undefined) {
      const birthdate = `${birthYear}-${birthMonth}-${birthDay}`;
      columnsUpdate.push({ col: 'birthdate', val: birthdate });
    }

    if (gender !== undefined) {
      columnsUpdate.push({ col: 'gender', val: gender });
    }

    await db.update('user', columnsUpdate,
      [{ col: 'id', oper: '=', val: userId }]);

    return this.get(userId);
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new User(obj));
    });
    return this.result;
  }
}

module.exports = UsersMdl;
