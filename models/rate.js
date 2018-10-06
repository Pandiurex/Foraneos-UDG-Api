const db = require('../db');

class Rate {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.locationId = data.locationId;
    this.commentTitle = data.commentTitle;
    this.comment = data.comment;
    if (data.date.getFullYear() !== undefined) {
      const year = data.date.getFullYear();
      const month = data.date.getMonth();
      const day = data.date.getDay();

      this.date = [year, month, day].join('-');
    } else {
      this.date = data.date;
    }
    this.servicesRate = data.servicesRate;
    this.securityRate = data.securityRate;
    this.localizationRate = data.localizationRate;
    this.costBenefictRate = data.costBenefictRate;
    this.usefulCounter = data.usefulCounter;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(rateId) {
    const rateTbl = await db.select('rate', '',
      [{ col: 'id', oper: '=', val: rateId }]);

    const rate = this.processResult(rateTbl)[0];

    return JSON.stringify(rate);
  }

  static async getAll(locationId) {
    const ratesTbl = await db.selectAll('rate',
      [{ col: 'locationId', oper: '=', val: locationId }]);

    const rates = this.processResult(ratesTbl);

    return JSON.stringify(rates);
  }

  static async create(
    {
      userId, locationId, commentTitle, comment,
      date, servicesRate, securityRate, localizationRate,
      costBenefictRate,
    },
  ) {
    const rateId = await db.insert('rate',
      ['userId', 'locationId', 'commentTitle', 'comment',
        'date', 'servicesRate', 'securityRate', 'localizationRate',
        'costBenefictRate'],
      [userId, locationId, commentTitle, comment,
        date, servicesRate, securityRate, localizationRate,
        costBenefictRate]);

    return JSON.stringify(rateId);
  }

  static async remove(rateId) {

  }

  static async update(rateId,
    {
      userId,
      locationId,
      commentTitle,
      comment,
      date,
      servicesRate,
      securityRate,
      localizationRate,
      costBenefictRate,
      usefulCounter,
    }) {

  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Rate(obj));
    });
    return this.result;
  }
}

module.exports = Rate;
