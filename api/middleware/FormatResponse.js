const config = require('config');


module.exports.FormatResponse = function(req,res){

    const APPLICATION_VERSION = config.get('APPLICATION_VERSION');
    const APPLICATION_DEVELOPER = config.get('APPLICATION_DEVELOPER');

    var res_body = res.body;
    var CustomResponse = {};
    var RefreshToken = req.RefreshToken ;

    if(res.statusCode >=200 && res.statusCode <400 ){
        CustomResponse = {
            dataset : res_body,
            publish:{
                developer : APPLICATION_DEVELOPER,
                version : APPLICATION_VERSION
            } 
        }
        if(RefreshToken!=undefined && RefreshToken!=""){
            res.status(203);
            CustomResponse.refreshToken = RefreshToken ;
        }
    }else{
        CustomResponse = {
            error : res_body,
            publish:{
                developer : APPLICATION_DEVELOPER,
                version : APPLICATION_VERSION
            }
        }
    }
    res.send(CustomResponse); 
}