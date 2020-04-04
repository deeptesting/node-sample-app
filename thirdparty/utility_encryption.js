const Cryptr = require('cryptr');
const config = require('config');




const CRYPTR_SECRET_KEY = config.get('CRYPTR_SECRET_KEY');
var _cryptr = new Cryptr(CRYPTR_SECRET_KEY);


module.exports = {
    Encrypt: function (data) { 
        const encryptedString = _cryptr.encrypt(data);
        return encryptedString;
    },
    Decrypt: function (data) {
        const decryptedString = _cryptr.decrypt(data);
        return decryptedString;
    }
}

