const jwt = require('jsonwebtoken');

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
            res.status(403).send({ message: "Authorization Failed."});
        } else {
            req.authData = authData;
            next();
        }
    });
}

async function isAdmin(req, res, next){
    
}

module.exports = {
    getToken,
    verifyToken
}