const APPDATA = require('../application_variable/AppVariable');

/**
 * @param req Request
 * @param res Response
 * @param next Next
 * @param paramName parameter name to find in request body
 * @param IsRequired boolean true/false
 * @param RegexMatchExp Regex pattern for any match, If not required match then just keep it ""
 * @param StringMinLength For check Any minimum length of String, By Default=0
 * @param StringMaxLength For check Any maximum length of String, By Default=0
 * @description :  To Validate the parameter
 * @returns void
 */
module.exports.Validate = function(req,res,next,paramName,IsRequired=false,RegexMatchExp="",
StringMinLength=0,StringMaxLength=0){

    if(paramName!=undefined && paramName!=""){
        //Required Validation check
        if(IsRequired){
           if(req.body[paramName]==undefined || req.body[paramName]==""){
            res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);  
            res.body = {message:paramName+" is required"}; return false;
           }
        }

        //RegexMatchExp Validation check
        if(RegexMatchExp!=""){
            if(req.body[paramName]!=undefined && req.body[paramName]!=""){
                var item_value = req.body[paramName];
                //var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var IsMatched = RegexMatchExp.test(item_value);  
                if(!IsMatched){
                    res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);  
                    res.body = {message:paramName+" is invalid"}; 
                    return false;
                }               
            }
        }

        if(StringMinLength>0 || StringMaxLength>0){
            if(req.body[paramName]!=undefined && req.body[paramName]!=""){
                var item_value = req.body[paramName];
                var itemLength = item_value.length;
                if(itemLength<StringMinLength){
                    res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);  
                    res.body = {message:paramName+` length should be minimum ${StringMinLength} charaters`}; 
                     return false;
                }  
                if(itemLength>StringMaxLength){
                    res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);  
                    res.body = {message:paramName+` length should be maximum ${StringMaxLength} charaters`}; 
                     return false;
                }                
            }
        }


    }

    return true;
}







module.exports.ValidateFile=function(req,res,next,paramName,IsRequired=false,MaxFileSizeinKB=500){
    
}