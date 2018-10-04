const models = require('../models');

class Factory {
  static async fillUpDB(num) {
    let n = 0;
    n += await this.createComplaintTypes(num) ? 1 : 0;
    n += await this.createServices(num) ? 1 : 0;
    n += await this.createUsers(num) ? 1 : 0;
    n += await this.createLocations(num) ? 1 : 0;

    return n;
  }

  static async createComplaintTypes(num) {
    const complaintTypes = [];

    for (let i = 1; i <= num; i += 1) {
      complaintTypes.push({
        description: `description${i}`,
      });
    }

    let myPromises = '';

    try {
      myPromises = complaintTypes.map(async (data) => {
        await models.complaintTypes.create(data);
      });
    } catch (e) {
      return false;
    }

    await Promise.all(myPromises);

    return true;
  }

  static async createServices(num) {
    const services = [];

    for (let i = 1; i <= num; i += 1) {
      services.push({
        description: `description${i}`,
        iconRef: `iconRef${i}`,
      });
    }

    let myPromises = '';

    try {
      myPromises = services.map(async (data) => {
        await models.service.create(data);
      });
    } catch (e) {
      return false;
    }

    await Promise.all(myPromises);

    return true;
  }

  static async createUsers(num) {
    const users = [];

    for (let i = 1; i <= num; i += 1) {
      users.push({
        userType: i,
        username: `username${i}`,
        password: `password${i}`,
        name: `name${i}`,
        firstSurname: `fSurname${i}`,
        secondSurname: `sSurname${i}`,
        profileImage: `profileImage${i}`,
        birthdate: `${i}-${i % 12}-${i % 28}`,
        gender: `${i % 2}`,
        mainEmail: `main${i}@email.com`,
      });
    }

    let myPromises = '';

    try {
      myPromises = users.map(async (data) => {
        await models.users.create(data);
      });
    } catch (e) {
      return false;
    }

    await Promise.all(myPromises);

    return true;
  }

  static async createLocations(num) {
    const locations = [];

    for (let i = 1; i <= num; i += 1) {
      locations.push({
        ownerUserId: i % (num / 2),
        lattitude: i,
        longitude: i,
        street: `street${i}`,
        colony: `colony${i}`,
        postalCode: i,
        streetAcross1: `streetAcross1-${i}`,
        streetAcross2: `streetAcross2-${i}`,
        extNum: i,
        intNum: i,
        numRooms: i,
        description: `description${i}`,
        restrictions: `restriction${i}`,
        cost: i,
        images: [
          {
            image: `image1 - ${i}`,
            description: `description1 - ${i}`,
          },
          {
            image: `image2 - ${i}`,
            description: `description2 - ${i}`,
          },
        ],
        services: [i, (i + 1) % num, (i + 2) % num],
      });
    }

    let myPromises = '';

    try {
      myPromises = locations.map(async (data) => {
        await models.locations.create(data);
      });
    } catch (e) {
      return false;
    }

    await Promise.all(myPromises);

    return true;
  }
}

module.exports = Factory;
