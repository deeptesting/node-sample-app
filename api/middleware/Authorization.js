const config = require('config');
const APPDATA = require('../application_variable/AppVariable');
const JWT_METHODS = require('../../thirdparty/utility_jwt');
const USER_METHODS = require('../../businesslogiclayer/UserMethods');


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
                     res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN).send({ error: "Passkey is missing" }); 
                 }
                 else{
                   if(user==undefined) {  
                       res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN).send({ error: "Forbidden Error" }); 
                     }
                    else{
                        const IsUserVerified = USER_METHODS.verifyPassKey(req.body.passkey,user);
                        if(IsUserVerified){ 

                                req.user = user;
                                if(IsTokenRegenerate){
                                    var jwtToken =  JWT_METHODS.createToken(user);
                                    req.RefreshToken = jwtToken;
                                }
                                next(); 
                            }
                        else{
                        res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN).send({ error: "Invalid PassKey" });
                        }
                    }
                 }
                                 
              })
              .catch((err) => {
                  if(bearerToken!=""){
                    var decoded = JWT_METHODS.decodeToken(bearerToken);
                    console.log(decoded);
                  }
                
                res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN).send({ error: "Invalid Token" }); // Forbidden
              });
        }
    }

}


