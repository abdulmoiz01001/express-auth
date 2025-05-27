require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateJWT = async(req, res, next) => {
    // 1. Check for token in cookies (preferred)
    const token =  req.cookies.token;

    console.log("token",token)

    // 2. Fallback to Authorization header (optional)
    // const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden (invalid/expired token)
        }
        req.user = user;
        
        console.log(user)
        console.log(req.user)
        next();
    });
};

module.exports = authenticateJWT;