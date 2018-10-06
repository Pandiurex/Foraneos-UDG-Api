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
    let rateTbl = '';

    try {
      rateTbl = await db.select('rate', '',
        [{ col: 'id', oper: '=', val: rateId }]);
    } catch (e) {
      return 0;
    }

    const rate = this.processResult(rateTbl)[0];

    return rate;
  }

  static async getAll(locationId) {
    let ratesTbl = '';

    try {
      ratesTbl = await db.selectAll('rate',
        [{ col: 'locationId', oper: '=', val: locationId }]);
    } catch (e) {
      return 0;
    }

    const rates = this.processResult(ratesTbl);

    return rates;
  }

  static async create(
    {
      userId, locationId, commentTitle, comment,
      date, servicesRate, securityRate, localizationRate,
      costBenefictRate,
    },
  ) {
    let rateId = '';
    try {
      rateId = await db.insert('rate',
        ['userId', 'locationId', 'commentTitle', 'comment',
          'date', 'servicesRate', 'securityRate', 'localizationRate',
          'costBenefictRate'],
        [userId, locationId, commentTitle, comment,
          date, servicesRate, securityRate, localizationRate,
          costBenefictRate]);
    } catch (e) {
      return 0;
    }

    const rates = await this.getAll(locationId);

    let i = 0;
    let avgServicesRate = 0;
    let avgSecurityRate = 0;
    let avgLocalizationRate = 0;
    let avgCostBenefictRate = 0;

    rates.forEach((data) => {
      avgServicesRate += data.servicesRate;
      avgSecurityRate += data.securityRate;
      avgLocalizationRate += data.localizationRate;
      avgCostBenefictRate += data.costBenefictRate;
      i += 1;
    });

    avgServicesRate /= i;
    avgSecurityRate /= i;
    avgLocalizationRate /= i;
    avgCostBenefictRate /= i;

    const columnsUpdate = [];
    columnsUpdate.push({ col: 'avgServicesRate', val: avgServicesRate });
    columnsUpdate.push({ col: 'avgSecurityRate', val: avgSecurityRate });
    columnsUpdate.push({ col: 'avgLocalizationRate', val: avgLocalizationRate });
    columnsUpdate.push({ col: 'avgCostBenefictRate', val: avgCostBenefictRate });

    await db.update('location', columnsUpdate,
      [{ col: 'id', oper: '=', val: locationId }]);

    return this.get(rateId);
  }

  static async remove(rateId) {
    const rate = await this.get(rateId);

    try {
      await db.delete('rate',
        [{ col: 'id', oper: '=', val: rateId }]);
    } catch (e) {
      return 0;
    }

    const rates = await this.getAll(rate.locationId);

    let i = 0;
    let avgServicesRate = 0;
    let avgSecurityRate = 0;
    let avgLocalizationRate = 0;
    let avgCostBenefictRate = 0;

    rates.forEach((data) => {
      avgServicesRate += data.servicesRate;
      avgSecurityRate += data.securityRate;
      avgLocalizationRate += data.localizationRate;
      avgCostBenefictRate += data.costBenefictRate;
      i += 1;
    });

    avgServicesRate /= i;
    avgSecurityRate /= i;
    avgLocalizationRate /= i;
    avgCostBenefictRate /= i;

    const columnsUpdate = [];
    columnsUpdate.push({ col: 'avgServicesRate', val: avgServicesRate });
    columnsUpdate.push({ col: 'avgSecurityRate', val: avgSecurityRate });
    columnsUpdate.push({ col: 'avgLocalizationRate', val: avgLocalizationRate });
    columnsUpdate.push({ col: 'avgCostBenefictRate', val: avgCostBenefictRate });

    await db.update('location', columnsUpdate,
      [{ col: 'id', oper: '=', val: rate.locationId }]);

    return rate;
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
