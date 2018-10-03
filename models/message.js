class Message {
  constructor(data) {
    this.id = data.id;
    this.senderUserId = data.senderUserId;
    this.receiverChatLocationId = data.receiverChatLocationId;
    this.message = data.message;
    this.time = data.time;
  }
}

module.exports = Message;
