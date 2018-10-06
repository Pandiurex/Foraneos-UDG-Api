const models = require('../models');

class Factory {
  static async fillUpDB(num) {
    let n = 0;
    n += await this.createComplaintTypes(num) ? 1 : 0;
    n += await this.createServices(num) ? 1 : 0;
    n += await this.createUsers(num) ? 1 : 0;
    n += await this.createLocations(num) ? 1 : 0;
    n += await this.createComplaints(num) ? 1 : 0;
    n += await this.createLivesIn(num) ? 1 : 0;
    n += await this.createMessage(num) ? 1 : 0;
    n += await this.createRate(num) ? 1 : 0;

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
        birthdate: `${2000 + i}-${1 + (i % 12)}-${1 + (i % 28)}`,
        gender: `${i % 2}`,
        mainEmail: `main${i}@email.com`,
      });
    }

    let myPromises = '';

    try {
      myPromises = users.map(async (data) => {
        await models.user.create(data);
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
        ownerUserId: 1 + (i % (num / 2)),
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
        services: [i, 1 + ((i + 1) % num), 1 + ((i + 2) % num)],
      });
    }

    let myPromises = '';

    try {
      myPromises = locations.map(async (data) => {
        await models.location.create(data);
      });
    } catch (e) {
      return false;
    }

    await Promise.all(myPromises);

    return true;
  }

  static async createComplaints(num) {
    const complaints = [];

    for (let i = 1; i <= num; i += 1) {
      complaints.push({
        userId: i,
        locationId: 1 + ((i + 2) % num),
        complaintTypeId: i,
        comment: `commentComplaint${i}`,
      });
    }

    let myPromises = '';

    try {
      myPromises = complaints.map(async (data) => {
        await models.complaint.create(data);
      });
    } catch (e) {
      return false;
    }

    await Promise.all(myPromises);

    return true;
  }

  static async createLivesIn(num) {
    const livesIn = [];

    for (let i = 1; i <= num; i += 1) {
      livesIn.push({
        userId: i,
        locationId: 1 + ((i + 2) % num),
        startDate: `${2000 + i}-${1 + (i % 12)}-${1 + (i % 28)}`,
        endDate: `${2001 + i}-${1 + (i % 12)}-${1 + (i % 28)}`,
      });
    }

    let myPromises = '';

    try {
      myPromises = livesIn.map(async (data) => {
        await models.livesIn.create(data);
      });
    } catch (e) {
      return false;
    }

    await Promise.all(myPromises);

    return true;
  }

  static async createMessage(num) {
    const messages = [];

    for (let i = 1; i <= num; i += 1) {
      let time = `${2001 + i}-${1 + (i % 12)}-${1 + (i % 28)} `;
      time += `${1 + (i % 24)}:${1 + (i % 60)}:${1 + (1 + (i % 60))}`;

      messages.push({
        senderUserId: 1 + ((i + 1) % num),
        locationId: i,
        message: `message${i}`,
        time: `${time}`,
      });
    }

    let myPromises = '';

    try {
      myPromises = messages.map(async (data) => {
        await models.message.create(data);
      });
    } catch (e) {
      return false;
    }

    await Promise.all(myPromises);

    return true;
  }

  static async createRate(num) {
    const rates = [];

    for (let i = 1; i <= num; i += 1) {
      rates.push({
        userId: 1 + ((i + 3) % num),
        locationId: i,
        commentTitle: `commentTitle${i}`,
        comment: `comment${i}`,
        date: `${2001 + i}-${1 + (i % 12)}-${1 + (i % 28)}`,
        servicesRate: i % 5,
        securityRate: i % 5,
        localizationRate: i % 5,
        costBenefictRate: i % 5,
      });
    }

    let myPromises = '';

    try {
      myPromises = rates.map(async (data) => {
        await models.rate.create(data);
      });
    } catch (e) {
      return false;
    }

    await Promise.all(myPromises);

    return true;
  }
}

module.exports = Factory;
