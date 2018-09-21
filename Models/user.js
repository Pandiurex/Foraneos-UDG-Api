const db = require('../DB');

class User {
  constructor(id, mainEmailId, userType, username, pass) {
    this.id = id;
    this.mainEmailId = mainEmailId;
    this.userType = userType;
    this.username = username;
    this.pass = pass;
  }

  save() {
    db.insert(this);
  }
}

module.exports = User;
