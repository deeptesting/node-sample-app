var crypto = require('crypto');
const config = require('config');

const HOST_URL = config.get('HOST_URL');


function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }


/**
 * @param str Where to replace
 * @param find Find Item
 * @param replace Replace Item
 * @description :  To ReplaceAll the String occurance
 * @returns String  
 */
module.exports.ReplaceAll = function(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


/**
 * @param imgFolderPath 'public\\Content\\UserImage\\1587195434152.jpg'
 * @description :  To Create a image Link
 * @returns String  
 */
module.exports.GetImageUrl = function(imgFolderPath) {
    var url = HOST_URL+"/"+ this.ReplaceAll(this.ReplaceAll(imgFolderPath,'\\','/'),'public','static');
    return url;
}





/**
 * @description :  To Generate new Guid
 * @returns String  
 */
module.exports.UUID =  function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
  




/**
 * @param : length -> How many length password do you want to generate
 * @description :  To Generate new Password
 * @returns String  
 */
module.exports.generatePassword =  function(length) {
    charset = "123456789abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}





// var salt = "Ck1MC8lvE6vIN5sWXN90Jb+j1VjzpJwbiWJ8ImCll2s="; //crypto.randomBytes(128).toString('base64');

// module.exports.generateHash = function(pwd) {
//     var hmac = crypto.createHmac('sha256', this.salt);
//     return hmac.update(pwd).digest('hex');
// };