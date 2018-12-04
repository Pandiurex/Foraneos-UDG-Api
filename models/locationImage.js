const db = require('../db');

class LocationImage {
  constructor(data) {
    this.id = data.id;
    this.locationId = data.locationId;
    this.image = data.image;
    this.description = data.description;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(locationImageId) {
    let locationImageTbl = '';

    try {
      locationImageTbl = await db.select('location_image', '',
        [{ col: 'id', oper: '=', val: locationImageId }]);
    } catch (e) {
      return 0;
    }

    if (locationImageTbl.length === 0) { return 0; }

    const locationImage = this.processResult(locationImageTbl)[0];

    return locationImage;
  }

  static async create({ locationId, image, description = '' }) {
    let locationImageId = '';

    try {
      locationImageId = await db.insert('location_image',
        ['locationId', 'image', 'description'],
        [locationId, image, description]);
    } catch (e) {
      return 0;
    }

    return this.get(locationImageId);
  }

  static async remove(locationImageId) {
    const locationImage = this.get(locationImageId);

    try {
      await db.delete('location_image',
        [{ col: 'id', oper: '=', val: locationImageId }]);
    } catch (e) {
      return 0;
    }

    return locationImage;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new LocationImage(obj));
    });
    return this.result;
  }
}

module.exports = LocationImage;
