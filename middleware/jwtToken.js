// This file use for token verify

const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]; // Bearer <token>
        const secret = 'loginJWTTokenBaseVerification'; // Use a secure secret

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.json({
                        error: 'Authentication error. Token has expired.',
                        status: 401,
                    });
                } else {
                    res.json({
                        error: 'Authentication error. Token is Invalid.',
                        status: 401,
                    });
                }
            } else {
                // Token is valid, pass the decoded token to the request object
                req.decoded = decoded;
                // Continue with the next middleware
                next();
            }
        });
    } else {
        return res.json({
            error: 'Authentication error. Token required.',
            status: 401,
        });
    }
}