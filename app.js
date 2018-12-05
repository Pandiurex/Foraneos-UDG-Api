require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');
const { errorHandler } = require('./middlewares');

const app = express();
const routes = require('./routes');

const logFile = fs.createWriteStream(`${__dirname}/node.log`, { flags: 'w' });
const logStdout = process.stdout;

console.log = (d) => {
  logFile.write(`${util.format(d)}\n}`);
  logStdout.write(`${util.format(d)}\n}`);
};

try {
  fs.mkdirSync('locationImages');
  fs.mkdirSync('profileImages');
} catch (err) {
  console.log('Existent dir');
}

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use('/api', routes)
  .use(errorHandler)
  .listen(process.env.PORT, () => console.log('App listening!'));

module.exports = app;
