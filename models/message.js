class Message {
  constructor(data) {
    this.id = data.id;
    this.senderUserId = data.senderUserId;
    this.locationId = data.locationId;
    this.viewed = data.viewed;
    this.message = data.message;
    this.time = data.time;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }
}

module.exports = Message;
