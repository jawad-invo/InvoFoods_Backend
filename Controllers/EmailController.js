const res = require('express/lib/response');
const nodeMailer = require('nodemailer');

let verificationCode;

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: 'jawad.akhtar@invozone.com',
    pass: 'snumuvtnqihhxqdu',
  },
});

async function sendEmail(email, code) {
  try {
    const emailOptions = {
      form: 'jawad.akhtar@invzone.com',
      to: email,
      subject: 'Verification Code',
      text: `Hi! Your verification code is: ${code}`,
    };

    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        res.status(400).send(error);
      }
      res.status(200).send(info);
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  sendEmail,
  verificationCode,
};
