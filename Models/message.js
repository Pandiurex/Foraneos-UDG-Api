const db = require('../DB');

class Rate {
  constructor(id, senderUserId, receiverChatLocationId,
    message, time) {
    this.id = id;
    this.senderUserId = senderUserId;
    this.receiverChatLocationId = receiverChatLocationId;
    this.message = message;
    this.time = time;
  }

  save() {
    db.insert(this);
  }
}

module.exports = Rate;
