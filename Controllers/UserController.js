const models = require('../models');
const User = models.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const email = require('../Controllers/EmailController');

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

async function create(req, res) {
    try {

        const code = getRandomNumber();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            age: req.body.age,
            verification: code,
            role: "user"
        }).then((user) => {
            if (user !== null) {
                email.sendEmail(user.email, code);
            }
            res.status(201).send(user);
        });

    } catch (error) {
        res.status(500).send({ message: error.errors });
    }
}

async function updatePassword(req, res) {
    try {

        User.update({
            password: await bcrypt.hash(req.body.new_password, 10)
        }, {
            where: {
                email: req.body.email,
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
            }
        }).then(user => {

            // Load hash from your password DB.
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result === true) {
                    if (user && user.verification !== null) {
                        res.status(403).send({ message: "Email not verified." });
                    }

                    jwt.sign({ user }, 'secretKey', { expiresIn: '30m' }, (err, token) => {
                        res.json({
                            token,
                            user
                        })
                    });
                } else if (user == null || result == false) {
                    res.status(403).send({ message: "User not found." });
                }
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