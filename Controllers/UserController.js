const models = require('../models');
const User = models.User;
const jwt = require('jsonwebtoken');

const { validationResult } = require("express-validator");
const db = require('../models');


async function create(req, res) {
    // try {

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).send(validationErrors);
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        age: req.body.age
    }).then(user => res.status(201).send(user));

    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
}

async function updatePassword(req, res) {
    try {
        await User.update({
            password: req.body.password
        }, {
            where: {
                id: req.body.id
            }
        }).then(status => res.status(200).send(status));
    } catch (error) {
        res.status(500).send(error);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ where: { email: req.body.email, password: req.body.password } });
        jwt.sign({ user }, 'secreteKey', (err, token) => {
            res.json({
                token
            })
        });

    } catch (error) {
        res.status(500).send(error);
    }
}



module.exports = {
    create,
    updatePassword,
    login,
};