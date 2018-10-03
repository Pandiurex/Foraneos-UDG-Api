class Complaint {
  constructor(data) {
    if (data.userId !== undefined) { this.userId = data.userId; }
    if (data.locationId !== undefined) { this.locationId = data.locationId; }
    if (data.complaintType !== undefined) { this.complaintType = data.complaintType; }
    if (data.comment !== undefined) { this.comment = data.comment; }
  }

  setComplaintType(data) {
    this.complaintType = data;
  }
}

module.exports = Complaint;
