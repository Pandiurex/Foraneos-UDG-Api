class LivesIn {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.locationId = data.locationId;
    this.active = data.active;
    if (data.startDate.getFullYear() !== undefined) {
      const year = data.startDate.getFullYear();
      const month = data.startDate.getMonth();
      const day = data.startDate.getDay();

      this.startDate = [year, month, day].join('-');
    } else {
      this.startDate = data.startDate;
    }
    if (data.endDate.getFullYear() !== undefined) {
      const year = data.endDate.getFullYear();
      const month = data.endDate.getMonth();
      const day = data.endDate.getDay();

      this.endDate = [year, month, day].join('-');
    } else {
      this.endDate = data.endDate;
    }
    this.rated = data.rated;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
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

module.exports = LivesIn;
