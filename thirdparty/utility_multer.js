var multer  = require('multer');
var upload = multer(); //https://www.npmjs.com/package/multer


/**
 * @description :  To Create Multer
 * @example : NoFile()
 * @returns new multer Initialization
 */
module.exports.NoFile = function(){
    return upload.none;
  }


/**
 * @param filename  string  filename formdata key
 * @description :  To Create Multer
 * @example : SingleFile('profileImg')
 * @returns new multer Initialization
 */
module.exports.SingleFile = function(filename){
  return upload.fields([{ name: filename, maxCount: 1 }]);
}


/**
 * @param filenames_arr  Array of filenames formdata keys 
 * @description :  To Create Multer
 * @example : MultipleFiles(['profileImg','coverPhoto']) or MultipleFiles(['profileImg','coverPhoto,2'])
 * @returns new multer Initialization
 */
module.exports.MultipleFiles = function(filenames_arr){
    var fieldarr =  [];
    if(filenames_arr!=undefined && Array.isArray(filenames_arr)){

        filenames_arr.forEach((fileitem)=>{           
            if (fileitem.indexOf(',') != -1) {
                var segments = fileitem.split(',');
                fieldarr.push({ name: segments[0], maxCount: parseInt(segments[1].trim()) })
            }
            else{
              fieldarr.push({ name: fileitem, maxCount: 1 })
            }
        })
    }
    return upload.fields(fieldarr);
  }