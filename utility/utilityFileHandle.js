var fs = require('fs');
var path = require('path');
    


/**
 * @param file_relativepath  Example : 'public\\buffer\\1586104902108.jpg' 
 * @param destination_folder_relative_path  Example : 'public\\Content\\UserImage'
 * @description :  To Move file from Buffer
 * @returns movedfilename  
 */
module.exports.MoveFileFromBuffer = async function(file_relativepath,destination_folder_relative_path){

    var filepath = appRootDirectory +"\\"+file_relativepath;

    //gets file name and adds it to destination_folder_path
    var f_name = path.basename(filepath);  
    var destpath = destination_folder_relative_path +"\\"+f_name ; 
    var dest = path.resolve(appRootDirectory, ""+destpath); 

    var movedfilename = await new Promise(function (resolve, reject) {
        fs.rename(filepath, dest, (err)=>{           
            if(err) throw err;
            else resolve(destpath);
        });
    });
    return movedfilename;
}




/**
 * @param file_relativepath  Example : 'public\\buffer\\1586104902108.jpg' 
 * @description :  To Remove the file from Buffer
 * @returns bool  
 */
module.exports.RemoveFileFromBuffer = async function(file_relativepath){

    try{
        var filePath = path.resolve(appRootDirectory, file_relativepath); 
        fs.unlinkSync(filePath)
        return true;
    }catch(ex){
        return false;
    }
}
