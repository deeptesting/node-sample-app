const APPDATA = require('../application_variable/AppVariable');
const JWT_METHODS = require('../../thirdparty/utility_jwt');
const USER_METHODS = require('../../businesslogiclayer/UserMethods');
const  ERRORHANDLE = require('../middleware/ErrorHandle');
const  VALIDATION = require('../middleware/ParamValidation');
const FILE_HANDLE = require('../../utility/utilityFileHandle');
const UTILITY_COMMON = require('../../utility/utilityCommon');




module.exports.Login = async function(req,res,next){


    var username = req.body.username ;
    var password = req.body.password ;
    var RememberMe = req.body.RememberMe || false;

    if(!VALIDATION.Validate(req,res,next,'username',true,APPDATA.REGEX_PATTERN.EMAIL) ){ return next(); }
    if(!VALIDATION.Validate(req,res,next,'password',true) ){ return next(); }
     
    //const user = { id: 5,  username: 'brad@gmail.com' }; // It is now hard-coded. later it is fetched from database
   
    var IsPasswordMatched = await USER_METHODS.CheckUserEmailPasswordRoles(username,password);
     
    if(IsPasswordMatched){
        var user = {};
        var obj = await USER_METHODS.GetUserDetailsByEmail(username); 
        user.UserId = obj.UserId ;
        user.Roles = obj.Roles ;
        user.UserEmail= obj.UserEmail;
        user.RememberMe = RememberMe ;
        
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





module.exports.Dashboard = async function(req,res,next){

    res.status(APPDATA.HTTP_STATUS_CODE.OK);  
    res.body =  { userdata:req.user,  message: "Welcome to Dashboard" }; 
    next();       
}




module.exports.InsertUser = async function(req,res,next){
    try {
     //   console.log("req.body",req.body);
        console.log("req.files",req.files);

        if(!VALIDATION.Validate(req,res,next,'useremail',true,APPDATA.REGEX_PATTERN.EMAIL) ){ return next(); }
        if(!VALIDATION.Validate(req,res,next,'fullname',true,APPDATA.REGEX_PATTERN.NAME) ){ return next(); }
        if(!VALIDATION.Validate(req,res,next,'cityid',true) ){ return next(); }

        if(!VALIDATION.ValidateFile(req,res,next,'profileimage',false) ){ return next(); }

        var profileImage = '';
        if(req.files.profileimage !=undefined){
           var fileItem = req.files.profileimage[0];
          // var filePath = appRootDirectory+"\\"+fileItem.path ;
          profileImage = await FILE_HANDLE.MoveFileFromBuffer(fileItem.path,"public\\Content\\UserImage");
        }

        var CreatedPassword = UTILITY_COMMON.generatePassword(8)
        var timeStamp = Math.floor(Date.now() / 1000);
            var userobj = {
                  UserId: UTILITY_COMMON.UUID(),
                  UserEmail: req.body.useremail,
                  Password: CreatedPassword,
                  
                  FullName: req.body.fullname,
                  Phone: req.body.phone || null,
                  Address: req.body.address || null,
                  CityId: req.body.cityid,
                  IsActive: 1,
                  ProfileImage: profileImage,
            }
            
            var userdetails = await  USER_METHODS.CreateUser(userobj);  

            if(userdetails.error!=undefined && userdetails.error!=""){
                FILE_HANDLE.RemoveFileFromBuffer(userobj.ProfileImage);
                res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);  
                res.body = {  "message" : userdetails.error }; return next();            
            } else{
                res.status(APPDATA.HTTP_STATUS_CODE.OK);  
                res.body = { "item" : userdetails, "message" : "Successfully inserted" }; return next();            
            }           
      } catch (e) {
        ERRORHANDLE.HandleError(e,req,res,next);
      };
   
}