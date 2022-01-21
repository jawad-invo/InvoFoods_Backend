const models = require('../models');
const User = models.User;
const jwt = require('jsonwebtoken');


async function create(req, res) {
    try {

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            age: req.body.age
        }).then(user => res.status(201).send(user));

    } catch (error) {
        res.status(500).send(error);
    }
}

async function updatePassword(req, res) {
    try {
        await User.update({
            password: req.body.password
        }, {
            where: {
                email: req.body.email,
                id: req.body.id
            }
        }).then(res.status(200).send(req.authData));
    } catch (error) {
        res.status(500).send(error);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });

        // if (!user) {
        //     res.status(403).send("Wrong Credentials");
        // }
        jwt.sign({ user }, 'secretKey', { expiresIn: '30s' }, (err, token) => {
            res.json({
                token,
                user
            })
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}



module.exports = {
    create,
    updatePassword,
    login,
};