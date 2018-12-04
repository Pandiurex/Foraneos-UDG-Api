const db = require('../db');

/**
 * Class locationService with its attributes
 to define the different locations
  */
class LocationService {
  /** @constructor */
  constructor(data) {
    /**
   * Property that indicates the location id
   * @type {number}
   */
    this.locationId = data.locationId;
    /**
   * Property that indicates the id of the service
   * @type {number}
   */
    this.serviceId = data.serviceId;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  /**
 * The function goes and searches the database
 for the service to the database, if it finds it
 returns the object
 * @param  {number, number}
 * @return {object}
 */
  static async get(locationId, serviceId) {
    let locationServiceTbl = '';

    try {
      locationServiceTbl = await db.selectAll('location_service',
        [{ col: 'locationId', oper: '=', val: locationId },
          {
            logic: 'AND', col: 'serviceId', oper: '=', val: serviceId,
          }]);
    } catch (e) {
      return 0;
    }

    if (locationServiceTbl.length === 0) { return 0; }

    const locationService = this.processResult(locationServiceTbl)[0];

    return locationService;
  }

  /**
 * Take the parameters and insert in
 the database if the parameters are correct
 * @param  {number, number}
 * @return {object}
 */
  static async create({ locationId, serviceId }) {
    const locationService = await this.get(locationId, serviceId);

    if (locationService !== 0) {
      return 1;
    }

    try {
      await db.insert('location_service',
        ['locationId', 'serviceId'],
        [locationId, serviceId]);
    } catch (e) {
      return 0;
    }

    return this.get(locationId, serviceId);
  }

  /**
 * Take the parameters and remove
 the indicated service from the database
 * @param  {number, number}
 * @return {object}
 */
  static async remove({ locationId, serviceId }) {
    const locationService = await this.get(locationId, serviceId);

    try {
      await db.delete('location_service',
        [{ col: 'locationId', oper: '=', val: locationId },
          {
            logic: 'AND', col: 'serviceId', oper: '=', val: serviceId,
          }]);
    } catch (e) {
      return 0;
    }

    return locationService;
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
      this.result.push(new LocationService(obj));
    });
    return this.result;
  }
}

module.exports = LocationService;
