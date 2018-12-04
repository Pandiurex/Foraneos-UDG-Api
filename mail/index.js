const nodemailer = require('nodemailer');

/**
 * Class that manages the delivery of mails
 */
class Mailer {
  /**
   * Constructor of Mailer class
   * @return {object} Returns an instance of Mailer
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    this.mailOptions = {
      from: `"Testing Mail" <${process.env.MAIL_USER}>`,
    };
    this.transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else if (success) {
        console.log('Mailer ready');
      }
    });
  }

  /**
   * Sends an email to the address specified in options
   * @param  {object} options Object that contains the next attributes:
   *                          {string}  from    Address from which the email will be sent
   *                          {string}  to      Address ti which the email will be sent
   *                          {string}  subject Mail subject
   *                          {string}  text    Mail text
   *                          {string}  html    Mail description
   * @return {number}         If there is an error happens it returns the error, otherwise returns 0
   */
  sendMail(options) {
    const mailOptions = {
      ...this.mailOptions,
      ...options,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      console.log(`Message sent to: ${mailOptions.to}`);
      console.log(`Message sent to: ${mailOptions.html}`);
      return 0;
    });
  }
}

module.exports = new Mailer();
