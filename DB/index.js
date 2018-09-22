const mysql = require('mysql');

class DB {
  constructor() {
    this.con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.con.connect();
  }

  query() {
    this.con.query('SELECT 1 + 1 AS solution', (err, results) => {
      if (err) throw err;
      console.log('The solution is: ', results[0].solution);
    });
  }

  getAll(table) {
    this.con.query(`SELECT * FROM ${table.toUpperCase()}`, (err, results) => {
      if (err) throw err;
      console.log(results);  //Sí muestra los resultados aquí en la consola, pero no al retornarlo al usersController
      this.result = results;
    });

    return this.result;
  }

  processResult(table, result) {
    const arr = [];
    result.forEach((r) => {
      new [table](r);
    });
  }
}

module.exports = new DB();