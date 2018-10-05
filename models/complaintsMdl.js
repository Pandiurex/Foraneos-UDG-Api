const db = require('../db');
const Complaint = require('./complaint');

class complaintsMdl {
  static async get(locationId, userId) {
    let complaintTbl = '';
    try {
      complaintTbl = await db.select('complaint', '',
        [{ col: 'locationId', oper: '=', val: locationId },
          {
            logic: 'AND', col: 'userId', oper: '=', val: userId,
          }]);
    } catch (e) {
      return '';
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

    return JSON.stringify(complaint);
  }

  static async getAll() {
    const complaintsTbl = await db.select('complaint',
      ['userId', 'locationId', 'complaintType', 'comment']);

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
      return '';
    }

    return this.get(locationId, userId);
  }

  static async remove() {

  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Complaint(obj));
    });
    return this.result;
  }
}

module.exports = complaintsMdl;
