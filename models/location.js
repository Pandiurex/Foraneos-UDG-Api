const db = require('../db');

class Location {
  constructor(data) {
    this.id = data.id;
    this.ownerUserId = data.ownerUserId;
    this.active = data.active;
    this.lattitude = data.lattitude;
    this.longitude = data.longitude;
    this.street = data.street;
    this.colony = data.colony;
    this.postalCode = data.postalCode;
    this.streetAcross1 = data.streetAcross1;
    this.streetAcross2 = data.streetAcross2;
    this.extNum = data.extNum;
    this.intNum = data.intNum;
    this.numRooms = data.numRooms;
    this.availableRooms = data.availableRooms;
    this.description = data.description;
    this.restrictions = data.restrictions;
    this.cost = data.cost;
    this.numComplaints = data.numComplaints;
    this.avgRate = data.avgRate;
    this.avgServicesRate = data.avgServicesRate;
    this.avgSecurityRate = data.avgSecurityRate;
    this.avgLocalizationRate = data.avgLocalizationRate;
    this.avgCostBenefictRate = data.avgCostBenefictRate;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  setOwnerFullname(name, firstSurname, secondSurname) {
    this.ownerFullname = `${name} ${firstSurname} ${secondSurname}`;
  }

  setImage(image) {
    this.image = image;
  }

  setImages(images) {
    this.images = images;
  }

  setServices(services) {
    this.services = services;
  }

  static async get(locationId) {
    let locationTbl = '';

    try {
      locationTbl = await db.select('location', '',
        [{ col: 'id', oper: '=', val: locationId }]);
    } catch (e) {
      return 0;
    }

    if (locationTbl.length === 0) { return 0; }

    const location = this.processResult(locationTbl)[0];

    const ownerFullnameTbl = await db.select('user',
      ['name', 'firstSurname', 'secondSurname'],
      [{ col: 'id', oper: '=', val: location.ownerUserId }]);

    location.setOwnerFullname(
      ownerFullnameTbl[0].name,
      ownerFullnameTbl[0].firstSurname,
      ownerFullnameTbl[0].secondSurname,
    );

    const images = [];

    try {
      const imagesTbl = await db.select('location_image',
        ['id', 'image', 'description'],
        [{ col: 'locationId', oper: '=', val: location.id }]);


      imagesTbl.forEach((data) => {
        const image = {
          id: data.id,
          image: data.image,
          description: data.description,
        };
        images.push(image);
      });
    } catch (e) { console.log('No images'); }

    location.setImages(images);

    const services = [];

    const locationServiceTbl = await db.select('location_service',
      ['serviceId'],
      [{ col: 'locationId', oper: '=', val: location.id }]);


    const myPromises = locationServiceTbl.map(async (data) => {
      const service = await db.select('service', '',
        [{ col: 'id', oper: '=', val: `${data.serviceId}` }]);

      services.push({
        id: service[0].id,
        description: service[0].description,
        iconRef: service[0].iconRef,
      });
    });

    await Promise.all(myPromises);

    location.setServices(services);

    return location;
  }

  static async getAll(orderBy = '', orderSense = '',
    limitOffset = '', limitCount = '') {
    let locationsTbl = '';

    let order = '';
    if (orderBy !== '' || orderSense !== '') {
      order = {
        col: orderBy,
        sense: orderSense,
      };
    }

    let limit = '';
    if (limitOffset !== '' || limitCount !== '') {
      limit = {
        start: limitOffset,
        quantity: limitCount,
      };
    }

    try {
      locationsTbl = await db.select('location',
        ['id', 'ownerUserId', 'active', 'lattitude',
          'longitude', 'colony', 'numRooms', 'availableRooms',
          'cost', 'avgRate', 'avgServicesRate', 'avgSecurityRate',
          'avgLocalizationRate', 'avgCostBenefictRate'], '',
        order, limit);
    } catch (e) {
      return 0;
    }

    const locations = this.processResult(locationsTbl);

    const myPromises = locations.map(async (data) => {
      let imageAux = '';
      try {
        const imagesTbl = await db.select('location_image',
          ['image'],
          [{ col: 'locationId', oper: '=', val: data.id }]);

        imageAux = imagesTbl[0].image;
      } catch (e) { console.log('No images'); }
      data.setImage(imageAux);

      const servicesArray = [];

      const locationServiceTbl = await db.select('location_service',
        ['serviceId'],
        [{ col: 'locationId', oper: '=', val: data.id }]);


      const myPromises2 = locationServiceTbl.map(async (data2) => {
        const service = await db.select('service', '',
          [{ col: 'id', oper: '=', val: `${data2.serviceId}` }]);

        servicesArray.push({
          id: service[0].id,
          description: service[0].description,
          iconRef: service[0].iconRef,
        });
      });

      await Promise.all(myPromises2);

      data.setServices(servicesArray);
    });

    await Promise.all(myPromises);

    return JSON.stringify(locations);
  }

  static async create(
    {
      ownerUserId, lattitude, longitude, street,
      colony, postalCode, streetAcross1, streetAcross2,
      extNum, intNum, numRooms, description,
      restrictions, cost, images = [], services = [],
    },
  ) {
    let locationId = '';

    try {
      locationId = await db.insert('location',
        ['ownerUserId', 'lattitude', 'longitude', 'street',
          'colony', 'postalCode', 'streetAcross1', 'streetAcross2',
          'extNum', 'intNum', 'numRooms', 'description',
          'restrictions', 'cost', 'availableRooms'],
        [ownerUserId, lattitude, longitude, street,
          colony, postalCode, streetAcross1, streetAcross2,
          extNum, intNum, numRooms, description,
          restrictions, cost, numRooms]);
    } catch (e) {
      return 0;
    }

    const myPromises = images.map(async (data) => {
      await db.insert('location_image',
        ['locationId', 'image', 'description'],
        [locationId, data.image, data.description]);
    });

    await Promise.all(myPromises);

    try {
      const myPromises2 = services.map(async (serviceId) => {
        await db.insert('location_service',
          ['locationId', 'serviceId'],
          [locationId, serviceId]);
      });

      await Promise.all(myPromises2);
    } catch (e) {
      await db.delete('location',
        [{ col: 'id', oper: '=', val: locationId }]);

      await db.delete('location_image',
        [{ col: 'locationId', oper: '=', val: locationId }]);

      return 1;
    }


    return this.get(locationId);
  }

  static async remove(locationId) {
    const location = this.get(locationId);

    if (location === 0) {
      return 0;
    }

    if (location.availableRooms === 0) {
      return 1;
    }

    await db.update('location',
      [{ col: 'active', val: 0 }],
      [{ col: 'id', oper: '=', val: locationId }]);

    return location;
  }

  static async update(locationId,
    {
      postalCode, numRooms, description, restrictions,
      cost,
    }) {
    const location = this.get(locationId);

    if (location === 0) {
      return 0;
    }

    const columnsUpdate = [];

    if (postalCode !== undefined) {
      columnsUpdate.push({ col: 'postalCode', val: postalCode });
    }

    if (numRooms !== undefined) {
      if (numRooms - location.numRooms + location.availableRooms < 2) {
        return 2;
      }
      columnsUpdate.push({ col: 'numRooms', val: numRooms });
    }

    if (description !== undefined) {
      columnsUpdate.push({ col: 'description', val: description });
    }

    if (restrictions !== undefined) {
      columnsUpdate.push({ col: 'restrictions', val: restrictions });
    }

    if (cost !== undefined) {
      columnsUpdate.push({ col: 'cost', val: cost });
    }

    try {
      await db.update('location', columnsUpdate,
        [{ col: 'id', oper: '=', val: locationId }]);
    } catch (e) {
      return 1;
    }

    return this.get(locationId);
  }

  static async patch(locationId,
    {
      postalCode, numRooms, description, restrictions,
      cost,
    }) {
    const location = this.get(locationId);

    const columnsUpdate = [];
    let updated = '';

    if (postalCode !== undefined) {
      columnsUpdate.push({ col: 'postalCode', val: postalCode });
      updated = { postalCode };
    }

    if (numRooms !== undefined) {
      if (numRooms - location.numRooms + location.availableRooms < 0) {
        return 1;
      }
      columnsUpdate.push({ col: 'numRooms', val: numRooms });
      updated = { numRooms };
    }

    if (description !== undefined) {
      columnsUpdate.push({ col: 'description', val: description });
      updated = { description };
    }

    if (restrictions !== undefined) {
      columnsUpdate.push({ col: 'restrictions', val: restrictions });
      updated = { restrictions };
    }

    if (cost !== undefined) {
      columnsUpdate.push({ col: 'cost', val: cost });
      updated = { cost };
    }

    if (columnsUpdate.length !== 1) {
      return 1;
    }

    try {
      await db.update('location', columnsUpdate,
        [{ col: 'id', oper: '=', val: locationId }]);
    } catch (e) {
      return 0;
    }

    return updated;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Location(obj));
    });
    return this.result;
  }
}

module.exports = Location;
