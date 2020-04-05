const APPDATA = require('../application_variable/AppVariable');
const JWT_METHODS = require('../../thirdparty/utility_jwt');
const USER_METHODS = require('../../businesslogiclayer/UserMethods');
const  ERRORHANDLE = require('../middleware/ErrorHandle');
const  VALIDATION = require('../middleware/ParamValidation');





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




module.exports.InsertUser = async function(req,res,next){
    try {
        console.log("req.body",req.body);
        console.log("req.files",req.files);

        if(!VALIDATION.Validate(req,res,next,'useremail',true,APPDATA.REGEX_PATTERN.EMAIL) ){ return next(); }
        if(!VALIDATION.Validate(req,res,next,'fullname',true,APPDATA.REGEX_PATTERN.NAME) ){ return next(); }
        if(!VALIDATION.Validate(req,res,next,'cityid',true) ){ return next(); }

        var timeStamp = Math.floor(Date.now() / 1000);
            var userobj = {
                  UserId: "d078113a-f7ff-4a7d-b86c-64fd6916d078",
                  UserEmail: req.body.useremail,
                  Password: "1234",
                  RegistrationTime: timeStamp,
                  FullName: req.body.fullname,
                  Phone: req.body.phone || null,
                  Address: req.body.address || null,
                  CityId: req.body.cityid,
                  IsActive: 1,
                  ProfileImage: '',
            }
            console.log("userobj",userobj)
        //     var citydetails = await  CITY_METHODS.CreateCity(cityobj);
        //     res.status(APPDATA.HTTP_STATUS_CODE.OK);  
            res.body = { "item" : {}, "message" : "Successfully tested" }; return next();
            
      } catch (e) {
        ERRORHANDLE.HandleError(e,req,res,next);
      };
   
}