class Rate {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.locationId = data.locationId;
    this.commentTitle = data.commentTitle;
    this.comment = data.comment;
    if (data.date.getFullYear() !== undefined) {
      const year = data.date.getFullYear();
      const month = data.date.getMonth();
      const day = data.date.getDay();

      this.date = [year, month, day].join('-');
    } else {
      this.date = data.date;
    }
    this.servicesRate = data.servicesRate;
    this.securityRate = data.securityRate;
    this.localizationRate = data.localizationRate;
    this.costBenefictRate = data.costBenefictRate;
    this.usefulCounter = data.usefulCounter;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }
}

module.exports = Rate;
