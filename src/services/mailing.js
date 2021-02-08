var nodemailer = require('nodemailer'); // email sender function exports.sendEmail = function(req, res){
// nodemailer stuff will go here

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'p.beltranes@gmail.com',
    pass: 'Skate4411-'
  }
});

var mailOptions = {
  from: 'Remitente',
  to: 'p.beltranes@gmail.com',
  subject: 'Asunto',
  text: 'Contenido del email'
};

exports.buy = () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      //   res.send(500, err.message);
    } else {
      console.log('Email sent');
      //res.status(200).jsonp(req.body);
    }
  });
};
