class ComplaintType {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }
}

module.exports = ComplaintType;
