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
    this.complaintDescription = complaintDescription;
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

    if (complaintTbl.length === 0) { return 0; }

    const complaint = this.processResult(complaintTbl)[0];

    const complaintDescriptionTbl = await db.select('complaint_type', ['description'],
      [{ col: 'id', oper: '=', val: complaint.complaintTypeId }]);

    const { description } = complaintDescriptionTbl[0];

    complaint.setComplaintDescription(description);

    const userFullnameTbl = await db.select('user',
      ['name', 'firstSurname', 'secondSurname'],
      [{ col: 'id', oper: '=', val: complaint.userId }]);

    const { name } = userFullnameTbl[0];
    const { firstSurname } = userFullnameTbl[0];
    const { secondSurname } = userFullnameTbl[0];

    complaint.setUserFullname(name, firstSurname, secondSurname);

    const locationStreetTbl = await db.select('location',
      ['street', 'extNum'],
      [{ col: 'id', oper: '=', val: complaint.locationId }]);

    const { street } = locationStreetTbl[0];
    const { extNum } = locationStreetTbl[0];

    complaint.setLocationStreet(street);
    complaint.setLocationExtNum(extNum);

    return complaint;
  }

  static async getAll(locationId) {
    let complaintsTbl = '';

    try {
      complaintsTbl = await db.selectAll('complaint',
        [{ col: 'locationId', oper: '=', val: locationId }]);
    } catch (e) {
      return 0;
    }

    if (complaintsTbl.length === 0) {
      return 0;
    }

    const complaints = this.processResult(complaintsTbl);

    const myPromises = complaints.map(async (data) => {
      const complaintDescriptionTbl = await db.select('complaint_type', ['description'],
        [{ col: 'id', oper: '=', val: `${data.complaintTypeId}` }]);

      const { description } = complaintDescriptionTbl[0];

      data.setComplaintDescription(description);

      const userFullnameTbl = await db.select('user',
        ['name', 'firstSurname', 'secondSurname'],
        [{ col: 'id', oper: '=', val: data.userId }]);

      const { name } = userFullnameTbl[0];
      const { firstSurname } = userFullnameTbl[0];
      const { secondSurname } = userFullnameTbl[0];

      data.setUserFullname(name, firstSurname, secondSurname);

      const locationStreetTbl = await db.select('location',
        ['street', 'extNum'],
        [{ col: 'id', oper: '=', val: data.locationId }]);

      const { street } = locationStreetTbl[0];
      const { extNum } = locationStreetTbl[0];

      data.setLocationStreet(street);
      data.setLocationExtNum(extNum);
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

    const numComplaintsTbl = await db.select('location', ['numComplaints'],
      [{ col: 'id', oper: '=', val: locationId }]);

    let { numComplaints } = numComplaintsTbl[0];

    numComplaints += 1;

    await db.update('location',
      [{ col: 'numComplaints', val: numComplaints }],
      [{ col: 'id', oper: '=', val: locationId }]);

    return this.get(locationId, userId);
  }

  static async remove({ locationId, userId }) {
    const complaint = await this.get(locationId, userId);

    if (complaint === 0) {
      return 0;
    }

    await db.delete('complaint',
      [{ col: 'locationId', oper: '=', val: locationId },
        {
          logic: 'AND', col: 'userId', oper: '=', val: userId,
        }]);

    const numComplaintsTbl = await db.select('location', ['numComplaints'],
      [{ col: 'id', oper: '=', val: locationId }]);

    let { numComplaints } = numComplaintsTbl[0];

    numComplaints -= 1;

    await db.update('location',
      [{ col: 'numComplaints', val: numComplaints }],
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
