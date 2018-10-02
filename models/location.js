class Location {
  constructor(data) {
    if (data.id !== undefined) { this.id = data.id; }
    if (data.ownerUserId !== undefined) { this.ownerUserId = data.ownerUserId; }
    if (data.active !== undefined) { this.active = data.active; }
    if (data.lattitude !== undefined) { this.lattitude = data.lattitude; }
    if (data.longitude !== undefined) { this.longitude = data.longitude; }
    if (data.street !== undefined) { this.street = data.street; }
    if (data.colony !== undefined) { this.colony = data.colony; }
    if (data.postalCode !== undefined) { this.postalCode = data.postalCode; }
    if (data.streetAcross1 !== undefined) { this.streetAcross1 = data.streetAcross1; }
    if (data.streetAcross2 !== undefined) { this.streetAcross2 = data.streetAcross2; }
    if (data.extNum !== undefined) { this.extNum = data.extNum; }
    if (data.intNum !== undefined) { this.intNum = data.intNum; }
    if (data.numRooms !== undefined) { this.numRooms = data.numRooms; }
    if (data.availableRooms !== undefined) { this.availableRooms = data.availableRooms; }
    if (data.description !== undefined) { this.description = data.description; }
    if (data.restrictions !== undefined) { this.restrictions = data.restrictions; }
    if (data.cost !== undefined) { this.cost = data.cost; }
    if (data.numComplaints !== undefined) { this.numComplaints = data.numComplaints; }
    if (data.avgRate !== undefined) { this.avgRate = data.avgRate; }
    if (data.avgServicesRate !== undefined) { this.avgServicesRate = data.avgServicesRate; }
    if (data.avgSecurityRate !== undefined) { this.avgSecurityRate = data.avgSecurityRate; }
    if (data.avgLocalizationRate !== undefined) {
      this.avgLocalizationRate = data.avgLocalizationRate;
    }
    if (data.avgCostBenefictRate !== undefined) {
      this.avgCostBenefictRate = data.avgCostBenefictRate;
    }
  }

  setOwnerFullname(name, firstSurname, secondSurname) {
    this.setOwnerFullname = `${name} ${firstSurname} ${secondSurname}`;
  }

  setImage(image) {
    this.image = image;
  }

  setImages(images) {
    this.images = images;
  }

  setServices(services) {
    this.services = services;
  }
}

module.exports = Location;
