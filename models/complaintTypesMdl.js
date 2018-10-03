const db = require('../db');
const ComplaintType = require('./complaintType');

class complaintTypesMdl {
  static async get(complaintTypeId) {
    const complaintTypesTbl = await db.select('complaint_type', '',
      [{ col: 'id', oper: '=', val: complaintTypeId }]);

    const complaintType = this.processResult(complaintTypesTbl)[0];

    return JSON.stringify(complaintType);
  }

  static async getAll() {
    const complaintTypesTbl = await db.select('complaint');

    const complaintTypes = this.processResult(complaintTypesTbl);

    return JSON.stringify(complaintTypes);
  }

  static async create({ description }) {
    const complaintTypeId = await db.insert('complaint',
      ['description'],
      [description]);

    return this.get(complaintTypeId);
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new ComplaintType(obj));
    });
    return this.result;
  }
}

module.exports = complaintTypesMdl;
