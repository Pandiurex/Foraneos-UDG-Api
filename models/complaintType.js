const db = require('../db');

// FIXME Todas las funciones deben estar documentadas
// FIXME En lugar de regresar un numero sin significado (cero cuando hay error), minimo una constante para codigos de errores y dejarlo documentado

class ComplaintType {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;

    // FIXME Para que estan quitando los keys undefined? no seria mas bien responsabilidad no definirlos o dejar un valor default desde aqui en el constructor?
    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(complaintTypeId) {
    let complaintTypesTbl = '';

    try {
      complaintTypesTbl = await db.select('complaint_type', '',
        [{ col: 'id', oper: '=', val: complaintTypeId }]);
    } catch (e) {
      return 0;
    }

    if (complaintTypesTbl.length === 0) { return 0; }

    const complaintType = this.processResult(complaintTypesTbl)[0];

    return complaintType;
  }

  static async getAll() {
    let complaintTypesTbl = '';

    try {
      complaintTypesTbl = await db.selectAll('complaint_type');
    } catch (e) {
      return 0;
    }

    const complaintTypes = this.processResult(complaintTypesTbl);

    return complaintTypes;
  }

  static async create({ description }) {
    let complaintTypeId = '';
    try {
      complaintTypeId = await db.insert('complaint_type',
        ['description'],
        [description]);
    } catch (e) {
      return 0;
    }

    return this.get(complaintTypeId);
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new ComplaintType(obj));
    });
    return this.result;
  }
}

module.exports = ComplaintType;
