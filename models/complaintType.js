const db = require('../db');

class ComplaintType {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(complaintTypeId) {
    let complaintTypesTbl = '';

    try {
      complaintTypesTbl = await db.select('complaint_type', '',
        [{ col: 'id', oper: '=', val: complaintTypeId }]);
    } catch (e) {
      return 0;
    }

    const complaintType = this.processResult(complaintTypesTbl)[0];

    return complaintType;
  }

  static async getAll() {
    let complaintTypesTbl = '';

    try {
      complaintTypesTbl = await db.selectAll('complaint_type');
    } catch (e) {
      return 0;
    }

    const complaintTypes = this.processResult(complaintTypesTbl);

    return complaintTypes;
  }

  static async create({ description }) {
    let complaintTypeId = '';
    try {
      complaintTypeId = await db.insert('complaint_type',
        ['description'],
        [description]);
    } catch (e) {
      return 0;
    }

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

module.exports = ComplaintType;
