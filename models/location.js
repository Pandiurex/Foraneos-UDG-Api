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
  }
}

module.exports = Location;
