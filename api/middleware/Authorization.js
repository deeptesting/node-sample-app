const config = require('config');
const APPDATA = require('../application_variable/AppVariable');
const JWT_METHODS = require('../../thirdparty/utility_jwt');
const USER_METHODS = require('../../businesslogiclayer/UserMethods');
const response_formatter = require('../middleware/FormatResponse');

module.exports.Auth = function(req,res,next){
    var bearerToken = "";
    const REFRESH_TOKEN_MIN = config.get('REFRESH_TOKEN_MIN');

    /** First check Bearer Token has or not */
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader == 'undefined') {
        res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN).send({ error: "Authorization header is missing" }); // Forbidden
    }else{
        const bearer = bearerHeader.split(' ');
        if(bearer.length!=2){
          res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN).send({ error: "Authorization Bearer Token is missing" }); // Forbidden
        }else{
               bearerToken = bearer[1];

              /** Now do check is jwt webtoken is valid or not */
              JWT_METHODS.verifyToken(bearerToken).then((response) => {
                 var user = JSON.parse(JSON.stringify(response));
                 delete user.exp ;
                 delete user.iat ;

                 var IsTokenRegenerate = false;
                 var expiry_timestamp = response.exp ;
                 var datetimeNowSec = new Date().getTime()/1000;

                if(expiry_timestamp > datetimeNowSec)
                {
                    //Check How many Minute is left
                    var timesecleft = (expiry_timestamp - datetimeNowSec);
                    if(timesecleft<= REFRESH_TOKEN_MIN*60 ){
                        IsTokenRegenerate = true;
                    }
                }


                 /** Now do check if jwttoken is valid , then check passkey */
                 if(req.body.passkey==undefined || req.body.passkey=="") 
                 {  
                    res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);
                    res.body = {  message:"Passkey is missing" };
                    return response_formatter.FormatResponse(req,res);
                 }
                 else{
                   if(user==undefined) {  
                            res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);
                            res.body = {  message:"Forbidden Error" };
                            return response_formatter.FormatResponse(req,res);
                    }
                    else{
                        const IsUserVerified = USER_METHODS.verifyPassKey(req.body.passkey,user);
                        if(IsUserVerified){ 

                                req.user = user; 
                                if(IsTokenRegenerate){
                                    var jwtToken =  JWT_METHODS.createToken(user);
                                    req.RefreshToken = jwtToken;
                                }
                                return next(); 
                            }
                        else{
                            res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);
                            res.body = {  message:"Invalid Passkey1" };
                            return response_formatter.FormatResponse(req,res);
                        } 
                    }
                 }
                                 
              })
              .catch((err) => {
                  if(bearerToken!=""){
                    var decoded_user = JWT_METHODS.decodeToken(bearerToken);
                    delete decoded_user.exp ;
                    delete decoded_user.iat ;
                    
                    /////--------------------------------------------
                    if(decoded_user!=undefined && decoded_user!=null && 
                        decoded_user.RememberMe!=undefined && decoded_user.RememberMe==true){

                        /** Now do check if jwttoken is valid , then check passkey */
                            if(req.body.passkey==undefined || req.body.passkey=="") 
                            {  
                                res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);
                                res.body = {  message:"Passkey is missing" };
                                return response_formatter.FormatResponse(req,res);
                                    
                            }
                            else{
                                const IsUserVerified = USER_METHODS.verifyPassKey(req.body.passkey,decoded_user);
                                if(IsUserVerified){ 
                           
                                        req.user = decoded_user; 
                                        
                                        var jwtToken =  JWT_METHODS.createToken(decoded_user);
                                        req.RefreshToken = jwtToken; 
                                        return next(); 
                                    }
                                else{
                                    res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN)
                                    res.body = {  message:"Invalid PassKey" };
                                    return response_formatter.FormatResponse(req,res);
                                   
                                }
                            }
                    }
                    /////--------------------------------------------
                  }
                 // Forbidden
                  res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN)
                  res.body = {  message:"Invalid Token" };
                  return response_formatter.FormatResponse(req,res);

                
              });
        }
    }

}


