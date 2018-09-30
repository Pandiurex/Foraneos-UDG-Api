class Complaint {
  constructor(data) {
    this.userId = data.userId;
    this.locationId = data.locationId;
    this.complaintType = data.complaintType;
    this.comment = data.comment;
  }
}

module.exports = Complaint;
