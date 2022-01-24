const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.User;
const bcrypt = require('bcryptjs');



async function getToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).send({ message: "Token not found.", })
    }
}

async function verifyToken(req, res, next) {
    jwt.verify(req.token, 'secretKey', (error, authData) => {
        if (error) {
            res.status(403).send({ message: "Authorization Failed." });
        } else {
            req.user_id = authData.user.id;
            req.authData = authData;
            next();
        }
    });
}

async function verifyUser(req, res, next) {

    if (typeof req.user_id === 'undefined' || typeof req.body.user_id === 'undefined' || (req.user_id !== parseInt(req.body.user_id))) {
        res.status(403).send({ message: "User not authenticated." })
    } else {
        next();
    }
}

async function isAdmin(req, res, next) {
    if (typeof req.user_id === 'undefined' || typeof req.body.user_id === 'undefined' || (req.user_id !== parseInt(req.body.user_id))) {
        res.status(403).send({ message: "User not authenticated." });
    }

    const result = await User.findOne({
        where: {
            id: req.user_id
        }
    }).then((result) => {
        if (result.role !== "admin") {
            res.status(403).send({ message: "Action not allowed." })
        }
        next();
    });
}

async function updatePassword(req, res, next) {
    const user = await User.findOne({
        where: {
            email: req.body.email,
        }
    }).then(user => {
        if (user === null)
            res.status(403).send({ message: "User not found." });

        // Compare hashed password from DB and from Request
        bcrypt.compare(req.body.old_password, user.password, function (err, result) {
            if (result == true)
                next();
            else
                res.status(403).send({ message: "Password does not match" })
        });

    })
}

module.exports = {
    getToken,
    verifyToken,
    verifyUser,
    isAdmin,
    updatePassword
}