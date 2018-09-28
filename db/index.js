const mysql = require('mysql');

class DB {
  constructor() {
    this.con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.select = this.select.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.insert = this.insert.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);

    this.disconnect = this.disconnect.bind(this);
    this.destroy = this.destroy.bind(this);
    this.columnsToStr = this.columnsToStr.bind(this);
    this.filtersToStr = this.filtersToStr.bind(this);
    this.orderToStr = this.orderToStr.bind(this);
    this.limitToStr = this.limitToStr.bind(this);
    this.valuesToStr = this.valuesToStr.bind(this);
    this.columnsUpdateToStr = this.columnsUpdateToStr.bind(this);

    this.con.connect((err) => {
      if (err) throw err;
    });
  }

  /**
   * Get the result of a SELECT query with the next params
   * @param  {String} table   Name of the table
   * @param  {[String]} columns Array of strings of the columns to obtain
   * ['col1', 'col2', ...]
   * @param  {[Obj]} filters Array of objects with the filters to apply
   * [{col: 'col1', oper: '<', val: 'value1'},
   *  {logic: 'AND', col: 'col2', oper: 'LIKE', val: 'value2'}, ...]
   * @param  {Obj} order   Array of two strings with the column and the sense
   * {col: 'col1', sense: 'DES'}
   * @param  {String} limit   Array of two string with the start element
   * and the quantity of elements
   * {start: '0', quantity: '10'}
   * @return {[type]}         Returns the result
   */
  async select(table, columns, filters = '', order = '', limit = '') {
    return new Promise((resolve, reject) => {
      let queryStr = 'SELECT ';

      queryStr += this.columnsToStr(columns);
      queryStr += ` FROM ${this.con.escape(table).replace(/'/g, '')}`;
      queryStr += this.filtersToStr(filters);
      queryStr += this.orderToStr(order);
      queryStr += this.limitToStr(limit);

      console.log(queryStr);

      this.con.query(queryStr, (err, results) => {
        if (err) throw reject(err);
        resolve(results);
      });
    });
  }

  /**
   * Get the result of a SELECT * FROM query with the next params
   * @param  {String} table   Name of the table
   * @param  {[Obj]} filters Array of objects with the filters to apply
   * [{col: 'col1', oper: '<', val: 'value1'},
   *  {logic: 'AND', col: 'col2', oper: 'LIKE', val: 'value2'}, ...]
   * @param  {Obj} order   Array of two strings with the column and the sense
   * {col: 'col1', sense: 'DES'}
   * @param  {Obj} limit   Array of two string with the start element
   * and the quantity of elements
   * {start: '0', quantity: '10'}
   * @return {[type]}         Returns the result
   */
  async selectAll(table, filters = '', order = '', limit = '') {
    return new Promise((resolve, reject) => {
      let queryStr = `SELECT * FROM ${this.con.escape(table).replace(/'/g, '')}`;

      queryStr += this.filtersToStr(filters);
      queryStr += this.orderToStr(order);
      queryStr += this.limitToStr(limit);

      this.con.query(queryStr, (err, results) => {
        if (err) throw reject(err);
        resolve(results);
      });
    });
  }

  /**
   * Insert a new row
   * @param  {String} table   Name of the table
   * @param  {[String]} columns Array of strings of the columns to obtain
   * ['col1', 'col2', ...]
   * @param  {[type]} values  Array of values to insert in the columns
   * @return {[type]}         Returns the result
   */
  async insert(table, columns, values) {
    return new Promise((resolve, reject) => {
      let queryStr = `INSERT INTO ${this.con.escape(table).replace(/'/g, '')} (`;

      queryStr += this.columnsToStr(columns);
      queryStr += ') VALUES (';
      queryStr += this.valuesToStr(values);
      queryStr += ')';

      console.log(queryStr);

      this.con.query(queryStr, (err, result) => {
        if (err) throw reject(err);
        resolve(result.insertId);
      });
    });
  }

  async delete() {

  }

  /**
   * Update a row
   * @param  {String} table   Name of the table
   * @param  {[type]} columnsUpdate Array of objects with the column and value to modify
   * [{col: 'col1', val: 'value1'},
   *  {col: 'col2', val: 'value2'}, ...]
   * @param  {[Obj]} filters Array of objects with the filters to apply
   * [{col: 'col1', oper: '<', val: 'value1'},
   *  {logic: 'AND', col: 'col2', oper: 'LIKE', val: 'value2'}, ...]
   * @return {[type]}               Returns the result
   */
  async update(table, columnsUpdate, filters) {
    return new Promise((resolve, reject) => {
      let queryStr = `UPDATE ${this.con.escape(table).replace(/'/g, '')}`;

      queryStr += ' SET';
      queryStr += this.columnsUpdateToStr(columnsUpdate);
      queryStr += this.filtersToStr(filters);

      console.log(queryStr);

      this.con.query(queryStr, (err, result) => {
        if (err) throw reject(err);
        resolve(result);
      });
    });
  }

  disconnect() {
    this.con.end();
  }

  destroy() {
    this.con.destroy();
  }

  columnsToStr(columns) {
    if (columns === '') { return '*'; }

    let string = '';

    columns.forEach((data) => {
      string += this.con.escape(data).replace(/'/g, '');
      string += ', ';
    });

    string = string.substring(0, string.length - 2);

    return string;
  }

  filtersToStr(filters) {
    if (filters === '') { return ''; }
    let string = ' WHERE';

    filters.forEach((data, index) => {
      if (index !== 0) {
        string += ` ${this.con.escape(data.logic).replace(/'/g, '')}`;
      }
      string += ` ${this.con.escape(data.col).replace(/'/g, '')}`;
      string += ` ${this.con.escape(data.oper).replace(/'/g, '')}`;
      if (data.oper === 'LIKE') {
        string += ` '%${this.con.escape(data.val).replace(/'/g, '')}%'`;
      } else {
        string += ` '${this.con.escape(data.val).replace(/'/g, '')}'`;
      }
    });

    return string;
  }

  orderToStr(order) {
    if (order === '') { return ''; }

    let string = ' ORDER BY';

    console.log(order);
    console.log(this.con.escape(order.col));
    console.log(this.con.escape(order.sense));

    string += ` ${this.con.escape(order.col).replace(/'/g, '')}`;
    string += ` ${this.con.escape(order.sense).replace(/'/g, '')}`;

    return string;
  }

  limitToStr(limit) {
    if (limit === '') { return ''; }

    let string = ' LIMIT';

    if (limit.start !== '') {
      string += ` ${this.con.escape(limit.start).replace(/'/g, '')},`;
    }
    string += ` ${this.con.escape(limit.quantity).replace(/'/g, '')}`;

    return string;
  }

  valuesToStr(values) {
    // if (values === '') { return ''; }

    let string = '';

    values.forEach((data) => {
      string += this.con.escape(data);
      string += ', ';
    });

    string = string.substring(0, string.length - 2);

    return string;
  }

  columnsUpdateToStr(columnsUpdate) {
    let string = '';

    columnsUpdate.forEach((data) => {
      string += ` ${this.con.escape(data.col).replace(/'/g, '')}`;
      string += ' =';
      string += ` ${this.con.escape(data.val)}`;
      string += ', ';
    });

    string = string.substring(0, string.length - 2);

    return string;
  }
}

module.exports = new DB();
