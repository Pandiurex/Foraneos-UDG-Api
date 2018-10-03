const models = require('../models');

class Factory {
  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  async createUser(num) {
    let status = 0;
    for (let i = 0; i < num && status === 0; i += 1) {
      status = await new models.UserMdl(base).save();
    }
    return status;
  }
}

module.exports = new Factory();
