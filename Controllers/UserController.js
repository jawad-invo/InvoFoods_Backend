const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');

const { User } = models;
const email = require('./EmailController');

async function create(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: 'client',
        }).then((user) => {
            res.status(201).send({
                message: 'Signup successfull',
                user,
            });
        });
    } catch (error) {
        res.status(500).send({ message: error.errors });
    }
}

async function updatePassword(req, res) {
    try {
        User.update(
            {
                password: await bcrypt.hash(req.body.new_password, 10),
            },
            {
                where: {
                    email: req.body.email,
                },
            }
        ).then((result) => {
            if (result == 1) {
                res.status(200).send({ message: 'Password updated!' });
            } else {
                res.status(403).send({ message: 'Password update failed!' });
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function login(req, res) {
    try {
        await User.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user) => {
            // Load hash from your password DB.
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result === true) {
                    // if (user && user.verification !== null) {
                    //     res.status(403).send({ message: 'Email not verified.' });
                    // }

                    jwt.sign(
                        { user },
                        'secretKey',
                        { expiresIn: '30m' },
                        (_err, token) => {
                            res.json({
                                token,
                                user,
                            });
                        }
                    );
                } else if (user == null || result === false) {
                    res.status(403).send({ message: 'User not found.' });
                }
            });
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function verifyEmail(req, res) {
    try {
        await User.update(
            {
                verification: null,
            },
            {
                where: {
                    email: req.body.email,
                    verification: parseInt(req.body.verification_code, 10),
                },
            }
        ).then((result) => {
            if (result === 1)
                res.status(200).send({ message: 'Verification successfull.' });
            else res.status(200).send({ message: 'Verification Failed!' });
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    create,
    updatePassword,
    login,
    verifyEmail,
};