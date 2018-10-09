const db = require('../db');

class Service {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;
    this.iconRef = data.iconRef;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(serviceId) {
    let serviceTbl = '';
    try {
      serviceTbl = await db.select('service', '',
        [{ col: 'id', oper: '=', val: serviceId }]);
    } catch (e) {
      return '';
    }

    if (serviceTbl.length === 0) { return 0; }

    const service = this.processResult(serviceTbl)[0];

    return JSON.stringify(service);
  }

  static async getAll() {
    let servicesTbl = '';
    try {
      servicesTbl = await db.selectAll('service');
    } catch (e) {
      return '';
    }

    const services = this.processResult(servicesTbl);

    return JSON.stringify(services);
  }

  static async create({ description, iconRef }) {
    let serviceId = '';
    try {
      serviceId = await db.insert('service',
        ['description', 'iconRef'],
        [description, iconRef]);
    } catch (e) {
      return '';
    }

    return this.get(serviceId);
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Service(obj));
    });
    return this.result;
  }
}

module.exports = Service;
