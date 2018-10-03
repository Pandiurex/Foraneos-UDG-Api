const db = require('../db');
const Complaint = require('./complaint');

class complaintsMdl {
  static async get(complaintId) {
    const complaintTbl = await db.select('complaint', '',
      [{ col: 'id', oper: '=', val: complaintId }]);
    const complaint = this.processResult(complaintTbl)[0];

    const mainComplaintTypeTbl = await db.select('complaint_type',['complaint_type']),
    [{ col: 'id' , oper: '=', val: complaint.complaintType}];

    complaint.setComplaintType(mainComplaintTypeTbl[0].complaintType);

    return JSON.stringify(complaint);
  }

  static async getAll() {
    const complaintsTbl = await db.select('complaint',
      ['userId', 'locationId', 'complaintType', 'comment']);

    const complaints = this.processResult(complaintsTbl);

    const myPromises = complaints.map(async (data) => {
      const complaintType = await db.select('complaint_type', ['complaint_type'],
        [{ col: 'id', oper: '=', val: `${data.complaintType}` }]);

      data.setComplaintType(complaint_type[0].complaintType);
    });

    await Promise.all(myPromises);

    return JSON.stringify(complaints);
  }

  static async create(
    {
      userId, locationId, complaintType, comment,
    },
  ) {
    const complaintId = await db.insert('complaint',
      ['userId', 'locationId', 'complaintType', 'comment',],
      [userId, locationId, complaintType, comment, 0]);

    const complaint = new Complaint({
      userId,
      locationId,
      complaintType,
      comment,
    });

    complaint.setComplaintType(complaintType);

    return JSON.stringify(complaint);
  }

  static async remove() {

  }

  static async update(){

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
