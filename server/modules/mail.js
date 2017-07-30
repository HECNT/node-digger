var nodemailer = require('nodemailer');

module.exports.enviarMail= function(to, body, subject){
  return new Promise (function (resolve, reject) {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
       user: 'hecntdev@gmail.com',
       pass: 'HecntDev117'
      }
    });

    var message = {
          from: '"Notificaciones Sistema HECNT"<hecntdev@gmail.com>',
          to: to,
          subject: subject,
          html: body
      };

      transporter.sendMail(message, function(err) {
        if (!err) {
          console.log('Email enviado');
        } else
          console.log(err);
        resolve();
      });
  });
}
