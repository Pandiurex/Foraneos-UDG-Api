class LivesIn {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.locationId = data.locationId;
    this.active = data.active;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.rated = data.rated;
  }
}

module.exports = LivesIn;
