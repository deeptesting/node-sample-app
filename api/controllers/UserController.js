const APPDATA = require('../application_variable/AppVariable');
const JWT_METHODS = require('../../thirdparty/utility_jwt');
const USER_METHODS = require('../../businesslogiclayer/UserMethods');





module.exports.Login = function(req,res,next){


    var username = req.body.username ;
    var password = req.body.password ;

    const user = { id: 5,  username: 'brad@gmail.com' }; // It is now hard-coded. later it is fetched from database
    user.UserEmail= user.username;

    if(username==user.username && password =="Mass4Pass"){
        var jwtToken =  JWT_METHODS.createToken(user);

        res.status(APPDATA.HTTP_STATUS_CODE.OK);  
        res.body =  { 
            message:"Successfully Logged In", 
            passkey: USER_METHODS.createPassKey(user),
            token: jwtToken 
        }; 
        return next();
    }else{

        res.status(APPDATA.HTTP_STATUS_CODE.BAD_REQUEST);  
        res.body =  {   error: "Invalid Login" }; 
        return next();
    }

}





module.exports.Dashboard = function(req,res,next){

    res.status(APPDATA.HTTP_STATUS_CODE.OK);  
    res.body =  {   message: "Welcome to Dashboard" }; 
    next();       
}