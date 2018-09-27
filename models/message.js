class Message {
  constructor(id, senderUserId, receiverChatLocationId,
    message, time) {
    this.id = id;
    this.senderUserId = senderUserId;
    this.receiverChatLocationId = receiverChatLocationId;
    this.message = message;
    this.time = time;
  }
}

module.exports = Message;
