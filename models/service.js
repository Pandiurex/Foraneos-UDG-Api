const db = require('../db');

/**
 * service class with constructor that
 defines its different attributes
  */

class Service {
  /** @constructor */
  constructor(data) {
    /**
   * Propiedad que indica el id del servicio
   * @type {number}
   */
    this.id = data.id;
    /**
   * Propiedad que indica una descripcion del servicio
   * @type {string}
   */
    this.description = data.description;
    /**
   * Propiedad que indica una referencia a donde se encuentra guardado el icono
   * @type {string}
   */
    this.iconRef = data.iconRef;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  /**
 * It goes and searches the database
 for the service and returns the found object
 * @param  {number}
 * @return {object}
 */
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

  /**
 * Goes and searches the database for
 the service and returns all found objects
 * @return  {object}
 */
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

  /**
 * Take the parameters and insert
 the data in the database and returns the found object
 * @param  {string, string}
 * @return {object}
 */
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

  /**
 * Process the result of a query by traversing the entire
 instruction to generate the object and return it
 * @param  {string}
 * @return {string}
 */
  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Service(obj));
    });
    return this.result;
  }
}

module.exports = Service;
