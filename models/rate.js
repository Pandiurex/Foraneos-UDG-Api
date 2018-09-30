class Rate {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.locationId = data.locationId;
    this.commentTitle = data.commentTitle;
    this.comment = data.comment;
    this.date = data.date;
    this.servicesRate = data.servicesRate;
    this.securityRate = data.securityRate;
    this.localizationRate = data.localizationRate;
    this.costBenefictRate = data.costBenefictRate;
    this.usefulCounter = data.usefulCounter;
  }
}

module.exports = Rate;
