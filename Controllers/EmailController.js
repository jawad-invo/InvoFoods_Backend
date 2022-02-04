const res = require('express/lib/response');
const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: 'jawad.akhtar@invozone.com',
    pass: 'snumuvtnqihhxqdu',
  },
});

async function sendEmail(email, total_meals, total_amount) {
  try {
    const emailOptions = {
      form: 'jawad.akhtar@invzone.com',
      to: email,
      subject: 'Invoice',
      text: `Hi! Here is the invoice. Total meals: ${total_meals}. Total amount to pay: ${total_amount}`,
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
  sendEmail
};
