const models = require('../models');
const User = models.User;
const jwt = require('jsonwebtoken');
const email = require('../Controllers/EmailController');


async function create(req, res) {
    try {

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            age: req.body.age,
            verification: email.verificationCode,
            role: "user"
        }).then(user => {
            email.sendEmail(req, res);
            res.status(201).send(user);
        });

    } catch (error) {
        res.status(500).send({ message: error.errors[0].message });
    }
}

async function updatePassword(req, res) {
    try {

        const result = await User.update({
            password: req.body.new_password
        }, {
            where: {
                email: req.body.email,
                password: req.body.old_password
            }
        }).then((result) => {
            if (result == 1) {
                res.status(200).send({ message: "Password updated!" })
            } else {
                res.status(403).send({ message: "Password update failed!" })
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        }).then(user => {
            if (user && user.verification !== null) {
                res.status(403).send({ message: "Email not verified." });
            }
            else if (user === null) {
                res.status(403).send({ message: "User not found." });
            }
            jwt.sign({ user }, 'secretKey', { expiresIn: '30m' }, (err, token) => {
                res.json({
                    token,
                    user
                })
            });
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function verifyEmail(req, res) {
    try {

        const result = await User.update({
            verification: null,
        }, {
            where: {
                email: req.body.email,
                verification: parseInt(req.body.verification_code)
            }
        }).then((result) => {
            if (result == 1)
                res.status(200).send({ message: "Verification successfull." })
            else
                res.status(200).send({ message: "Verification Failed!" })
        });

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    create,
    updatePassword,
    login,
    verifyEmail
};