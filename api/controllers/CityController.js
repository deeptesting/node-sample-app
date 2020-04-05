const APPDATA = require('../application_variable/AppVariable');
const JWT_METHODS = require('../../thirdparty/utility_jwt');
const  ERRORHANDLE = require('../middleware/ErrorHandle');
const  VALIDATION = require('../middleware/ParamValidation');
const CITY_METHODS = require('../../businesslogiclayer/CityMethods');





module.exports.GetAllCities = async function(req,res,next){
    try {
        console.log("appRootDirectory",appRootDirectory);
        
        var allcities = await  CITY_METHODS.GetAllCitis();
        res.status(APPDATA.HTTP_STATUS_CODE.OK);  
        res.body = allcities; return next();
    } catch (e) {
        ERRORHANDLE.HandleError(e,req,res,next);
    };
    
}



module.exports.GetCityByID = async function(req,res,next){
    try {
        var id = parseInt(req.params.id);
        var citydetails = await  CITY_METHODS.GetCityDetailsByID(id);
        res.status(APPDATA.HTTP_STATUS_CODE.OK);  
        res.body = citydetails; return next();
    } catch (e) {
        ERRORHANDLE.HandleError(e,req,res,next);
    };
}




module.exports.InsertCity = async function(req,res,next){
    try {
        
        if(!VALIDATION.Validate(req,res,next,'city_name',true,APPDATA.REGEX_PATTERN.NAME) ){ return next(); }
        if(!VALIDATION.Validate(req,res,next,'state_id',true) ){ return next(); }


            var cityobj = {
                City_Name : req.body.city_name,
                State_Id : req.body.state_id
            }
            var citydetails = await  CITY_METHODS.CreateCity(cityobj);
            res.status(APPDATA.HTTP_STATUS_CODE.OK);  
            res.body = { "item" : citydetails, "message" : "Successfully inserted" }; return next();
            
      } catch (e) {
        ERRORHANDLE.HandleError(e,req,res,next);
      };
   
}


module.exports.UpdateCity = async function(req,res,next){
    try {
            if(!VALIDATION.Validate(req,res,next,'city_name',true,/^[A-Za-z ]+$/) ){ return next(); }
            if(!VALIDATION.Validate(req,res,next,'state_id',true) ){ return next(); }

            var cityobj = {
                City_Name : req.body.city_name,
                State_Id : req.body.state_id
            }
            var id = parseInt(req.params.id);
            var [row] = await  CITY_METHODS.UpdateCityByID(cityobj,id);
            if(row>0) { 
                cityobj.id = id ; 
                res.status(APPDATA.HTTP_STATUS_CODE.OK);  
                res.body = { "item" : cityobj, "message" : "Successfully updated" }; return next();
            }else{
                res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);  
                res.body = { "item" : cityobj, "message" : "Sorry not updated" }; return next();
            }
        } catch (e) {
            ERRORHANDLE.HandleError(e,req,res,next);
        };
    
}


