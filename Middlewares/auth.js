
async function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        next();
    } else {
        res.status(403).send({ message: "Token invalid" })
    }
}

module.exports = {
    verifyToken
}