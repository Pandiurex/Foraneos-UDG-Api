const db = require('../db');

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

  static async get(locationId, userId) {
    let complaintTbl = '';

    try {
      complaintTbl = await db.select('complaint', '',
        [{ col: 'locationId', oper: '=', val: locationId },
          {
            logic: 'AND', col: 'userId', oper: '=', val: userId,
          }]);
    } catch (e) {
      return 0;
    }

    const complaint = this.processResult(complaintTbl)[0];

    const complaintDescriptionTbl = await db.select('complaint_type', ['description'],
      [{ col: 'id', oper: '=', val: complaint.complaintTypeId }]);

    complaint.setComplaintDescription(complaintDescriptionTbl[0].description);

    const userFullnameTbl = await db.select('user',
      ['name', 'firstSurname', 'secondSurname'],
      [{ col: 'id', oper: '=', val: complaint.userId }]);

    complaint.setUserFullname(
      userFullnameTbl[0].name,
      userFullnameTbl[0].firstSurname,
      userFullnameTbl[0].secondSurname,
    );

    const locationStreetTbl = await db.select('location',
      ['street', 'extNum'],
      [{ col: 'id', oper: '=', val: complaint.locationId }]);

    complaint.setLocationStreet(locationStreetTbl[0].street);
    complaint.setLocationExtNum(locationStreetTbl[0].extNum);

    return complaint;
  }

  static async getAll(locationId) {
    let complaintsTbl = '';

    try {
      complaintsTbl = await db.select('complaint',
        ['userId', 'locationId', 'complaintType', 'comment'],
        [{ col: 'locationId', oper: '=', val: locationId }]);
    } catch (e) {
      return 0;
    }

    const complaints = this.processResult(complaintsTbl);

    const myPromises = complaints.map(async (data) => {
      const complaintType = await db.select('complaint_type', ['complaint_type'],
        [{ col: 'id', oper: '=', val: `${data.complaintType}` }]);

      data.setComplaintType(complaintType[0].complaintType);

      const userFullnameTbl = await db.select('user',
        ['name', 'firstSurname', 'secondSurname'],
        [{ col: 'id', oper: '=', val: data.userId }]);

      data.setUserFullname(
        userFullnameTbl[0].name,
        userFullnameTbl[0].firstSurname,
        userFullnameTbl[0].secondSurname,
      );

      const locationStreetTbl = await db.select('location',
        ['street', 'extNum'],
        [{ col: 'id', oper: '=', val: data.locationId }]);

      data.setLocationStreet(locationStreetTbl[0].street);
      data.setLocationExtNum(locationStreetTbl[0].extNum);
    });

    await Promise.all(myPromises);

    return JSON.stringify(complaints);
  }

  static async create(
    {
      userId, locationId, complaintTypeId, comment,
    },
  ) {
    try {
      await db.insert('complaint',
        ['userId', 'locationId', 'complaintTypeId', 'comment'],
        [userId, locationId, complaintTypeId, comment]);
    } catch (e) {
      return 0;
    }

    const numComplaints = db.select('location', ['numComplaints'],
      [{ col: 'id', oper: '=', val: locationId }]);

    await db.update('location',
      [{ col: 'numComplaints', val: numComplaints + 1 }],
      [{ col: 'id', oper: '=', val: locationId }]);

    return this.get(locationId, userId);
  }

  static async remove(locationId, userId) {
    const complaint = this.get(locationId, userId);

    try {
      await db.delete('complaint',
        [{ col: 'locationId', oper: '=', val: locationId },
          {
            logic: 'AND', col: 'userId', oper: '=', val: userId,
          }]);
    } catch (e) {
      return 0;
    }

    const numComplaints = db.select('location', ['numComplaints'],
      [{ col: 'id', oper: '=', val: locationId }]);

    await db.update('location',
      [{ col: 'numComplaints', val: numComplaints - 1 }],
      [{ col: 'id', oper: '=', val: locationId }]);

    return complaint;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Complaint(obj));
    });
    return this.result;
  }
}

module.exports = Complaint;
