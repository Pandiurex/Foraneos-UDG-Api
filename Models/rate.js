const db = require('../DB');

class Rate {
  constructor(id, userId, locationId, commentTitle, comment,
    date, servicesRate, securityRate, localizationRate,
    costBenefictRate, usefulCounter) {
    this.id = id;
    this.userId = userId;
    this.locationId = locationId;
    this.commentTitle = commentTitle;
    this.comment = comment;
    this.date = date;
    this.servicesRate = servicesRate;
    this.securityRate = securityRate;
    this.localizationRate = localizationRate;
    this.costBenefictRate = costBenefictRate;
    this.usefulCounter = usefulCounter;
  }

  save() {
    db.insert(this);
  }
}

module.exports = Rate;
