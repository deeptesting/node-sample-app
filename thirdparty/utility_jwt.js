var jwt = require('jsonwebtoken');
const config = require('config');




const JWT_SECRET_KEY = config.get('JWT_SECRET_KEY');
const JWT_TOKEN_EXPIRE_MIN = config.get('JWT_TOKEN_EXPIRE_MIN');



module.exports = {
    createToken: function (user) { // algorithm: 'RS256',  { algorithms: 'RS256'},
        var jwtToken = jwt
            .sign(user,JWT_SECRET_KEY, {expiresIn: JWT_TOKEN_EXPIRE_MIN * 60 });
        return jwtToken;
    },
    verifyToken: function (token) {
        return new Promise(function (resolve, reject) {
            jwt
                .verify(token, JWT_SECRET_KEY, function (err, decoded) {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        return resolve(decoded);
                    }
                })
        });
    },
     decodeToken: function (token) { // algorithm: 'RS256',  { algorithms: 'RS256'},
        var decoded = jwt.decode(token);
        return decoded;
    },
}
