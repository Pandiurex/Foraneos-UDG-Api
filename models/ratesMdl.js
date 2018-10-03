const db = require('../db');
const Rate = require('./rate');

class ratesMdl {
  static async get(rateId) {
    const rateTbl = await db.select('rate', '',
      [{ col: 'id', oper: '=', val: rateId }]);

    const rate = this.processResult(rateTbl)[0];

    return JSON.stringify(rate);
  }

  static async getAll() {
    const ratesTbl = await db.select('rate',
      ['id', 'userId', 'locationId', 'commentTitle',
        'comment', 'date', 'servicesRate', 'securityRate',
        'localizationRate', 'costBenefictRate', 'usefulCounter']);

    const rates = this.processResult(ratesTbl);

    return JSON.stringify(rates);
  }

  static async create(
    {
      userId, locationId, commentTitle, comment,
      date, servicesRate, securityRate, localizationRate,
      costBenefictRate, usefulCounter,
    },
  ) {
    const rateId = await db.insert('rate',
      ['userId', 'locationId', 'commentTitle', 'comment',
        'date', 'servicesRate', 'securityRate', 'localizationRate',
        'costBenefictRate', 'usefulCounter'],
      [userId, locationId, commentTitle, comment,
        date, servicesRate, securityRate, localizationRate,
        costBenefictRate, usefulCounter, 0]);


    const rate = new Rate({
      id: userId,
      locationId,
      commentTitle,
      comment,
      date,
      servicesRate,
      securityRate,
      localizationRate,
      costBenefictRate,
      usefulCounter,
    });

    return JSON.stringify(rate);
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
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new Rate(obj));
    });
    return this.result;
  }
}

module.exports = ratesMdl;
