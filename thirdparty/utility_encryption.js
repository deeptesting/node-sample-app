const Cryptr = require('cryptr');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('config');




const CRYPTR_SECRET_KEY = config.get('CRYPTR_SECRET_KEY');
var _cryptr = new Cryptr(CRYPTR_SECRET_KEY);


module.exports.Encrypt = function (data) { 
    const encryptedString = _cryptr.encrypt(data);
    return encryptedString;
}

module.exports.Decrypt = function (data) {
     const decryptedString = _cryptr.decrypt(data);
     return decryptedString;
}


module.exports.CreatePasswordHash = function (rawpassword) {
    const hash = bcrypt.hashSync(rawpassword, saltRounds);
    return hash;
}

module.exports.IsMatchPasswordHash = function (input_rawpassword,hashpasswordInDB) {
    var IsMatched = bcrypt.compareSync(input_rawpassword, hashpasswordInDB); 
    return IsMatched;
}