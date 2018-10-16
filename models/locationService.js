const db = require('../db');

// FIXME Todas las funciones deben estar documentadas
// FIXME En lugar de regresar un numero sin significado (cero cuando hay error), minimo una constante para codigos de errores y dejarlo documentado

class LocationService {
  constructor(data) {
    this.locationId = data.locationId;
    this.serviceId = data.serviceId;

    // FIXME Para que estan quitando los keys undefined? no seria mas bien responsabilidad no definirlos o dejar un valor default desde aqui en el constructor?
    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(locationId, serviceId) {
    let locationServiceTbl = '';

    try {
      locationServiceTbl = await db.select('location_service', '',
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

  static async remove(locationId, serviceId) {
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

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new LocationService(obj));
    });
    return this.result;
  }
}

module.exports = LocationService;
