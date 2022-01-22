const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.User;



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

module.exports = {
    getToken,
    verifyToken,
    verifyUser,
    isAdmin
}