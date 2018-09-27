class Location {
  constructor(id, ownerUserId, active, lattitude, longitude,
    street, colony, postalCode, streetAcross1, streetAcross2,
    extNum, intNum, numRooms, availableRooms) {
    this.id = id;
    this.ownerUserId = ownerUserId;
    this.active = active;
    this.lattitude = lattitude;
    this.longitude = longitude;
    this.street = street;
    this.colony = colony;
    this.postalCode = postalCode;
    this.streetAcross1 = streetAcross1;
    this.streetAcross2 = streetAcross2;
    this.extNum = extNum;
    this.intNum = intNum;
    this.numRooms = numRooms;
    this.availableRooms = availableRooms;
  }
}

module.exports = Location;
