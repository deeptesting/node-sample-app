const encryption = require('../thirdparty/utility_encryption');

const UserSplitOperator = "__";

module.exports = {
    createPassKey: function (user) { 
       var string =  user.Id + UserSplitOperator + user.UserEmail ;
        return encryption.Encrypt(string);
    },
    verifyPassKey: function (passkey,user) {
        var string =  user.Id + UserSplitOperator + user.UserEmail ;
        return (encryption.Decrypt(passkey) == string);
    }
}