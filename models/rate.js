class Rate {
  constructor(data) {
    if (data.id !== undefined) { this.id = data.id; }
    if (data.userId !== undefined) { this.userId = data.userId; }
    if (data.locationId !== undefined) { this.locationId = data.locationId; }
    if (data.commentTitle !== undefined) { this.commentTitle = data.commentTitle; }
    if (data.comment !== undefined) { this.comment = data.comment; }
    if (data.date !== undefined) { this.date = data.date; }
    if (data.servicesRate !== undefined) { this.servicesRate = data.servicesRate; }
    if (data.securityRate !== undefined) { this.securityRate = data.securityRate; }
    if (data.localizationRate !== undefined) { this.localizationRate = data.localizationRate; }
    if (data.costBenefictRate !== undefined) { this.costBenefictRate = data.costBenefictRate; }
    if (data.usefulCounter !== undefined) { this.usefulCounter = data.usefulCounter; }
  }
}

module.exports = Rate;
