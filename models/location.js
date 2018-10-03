class Location {
  constructor(data) {
    this.id = data.id;
    this.ownerUserId = data.ownerUserId;
    this.active = data.active;
    this.lattitude = data.lattitude;
    this.longitude = data.longitude;
    this.street = data.street;
    this.colony = data.colony;
    this.postalCode = data.postalCode;
    this.streetAcross1 = data.streetAcross1;
    this.streetAcross2 = data.streetAcross2;
    this.extNum = data.extNum;
    this.intNum = data.intNum;
    this.numRooms = data.numRooms;
    this.availableRooms = data.availableRooms;
    this.description = data.description;
    this.restrictions = data.restrictions;
    this.cost = data.cost;
    this.numComplaints = data.numComplaints;
    this.avgRate = data.avgRate;
    this.avgServicesRate = data.avgServicesRate;
    this.avgSecurityRate = data.avgSecurityRate;
    this.avgLocalizationRate = data.avgLocalizationRate;
    this.avgCostBenefictRate = data.avgCostBenefictRate;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  setOwnerFullname(name, firstSurname, secondSurname) {
    this.ownerFullname = `${name} ${firstSurname} ${secondSurname}`;
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
