
const res = require('express/lib/response');
const nodeMailer = require('nodemailer');
var verificationCode;

async function sendEmail() {
    try {
        transporter.sendMail(emailOptions, function (error, info) {
            if (error) {
                res.status(400).send(error);
            }
            res.status(200).send(info);
        })
    } catch (error) {
        res.status(400).send(error);
    }
}
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'jawad.akhtar@invozone.com',
        pass: 'snumuvtnqihhxqdu'
    }
})
const emailOptions = {
    form: "jawad.akhtar@invzone.com",
    to: "jawadakhter7@gmail.com",
    subject: "Verification Code",
    text: "Hi! Your verification code is: " + getRandomNumber()
}

function getRandomNumber() {
    try {
        var n = Math.floor(100000 + Math.random() * 900000)
        n = n.toString().substring(0, 4);
        n = parseInt(n);
        verificationCode = n;
        return n;
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    sendEmail,
    verificationCode
}