class Complaint {
  constructor(data) {
    this.userId = data.userId;
    this.locationId = data.locationId;
    this.complaintTypeId = data.complaintTypeId;
    this.comment = data.comment;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  setComplaintDescription(complaintDescription) {
    this.setComplaintDescription = complaintDescription;
  }

  setUserFullname(name, firstSurname, secondSurname) {
    this.userFullname = `${name} ${firstSurname} ${secondSurname}`;
  }

  setLocationStreet(street) {
    this.locationStreet = street;
  }

  setLocationExtNum(extNum) {
    this.locationExtNum = extNum;
  }
}

module.exports = Complaint;
