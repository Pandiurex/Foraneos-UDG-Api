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
      return '';
    }

    const complaintType = this.processResult(complaintTypesTbl)[0];

    return JSON.stringify(complaintType);
  }

  static async getAll() {
    let complaintTypesTbl = '';
    try {
      complaintTypesTbl = await db.select('complaint');
    } catch (e) {
      return '';
    }

    const complaintTypes = this.processResult(complaintTypesTbl);

    return JSON.stringify(complaintTypes);
  }

  static async create({ description }) {
    let complaintTypeId = '';
    try {
      complaintTypeId = await db.insert('complaint_type',
        ['description'],
        [description]);
    } catch (e) {
      return '';
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
