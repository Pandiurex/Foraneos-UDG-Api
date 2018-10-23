const express = require('express');

const emailer = require('../mail');

const route = express.Router();

route

  .get('/sendmail', (req, res) => {
    const options = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'bar@example.com, baz@example.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    };
    emailer.sendMail(options);
  });

module.exports = route;
