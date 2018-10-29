const nodemailer = require('nodemailer');

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // Variable de entorno
      port: process.env.MAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS, // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    this.mailOptions = {
      from: '"Testing Mail" <foraneos@udg.com',
    };
    this.transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });
  }


  // Validar que el transporter si tiene una conexion
  // this.transporter.verify()

  sendMail(options) {
    console.log('Mandando correo');

    const mailOptions = {
      ...this.mailOptions,
      ...options,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      return 0;
    });
  }
}

module.exports = new Mailer();
