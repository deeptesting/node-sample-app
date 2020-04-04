const config = require('config');
const response_formatter = require('../middleware/FormatResponse');
const APPDATA = require('../application_variable/AppVariable');

module.exports.HandleError = function(err,req,res,next){

    res.status(APPDATA.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    res.body = {  error_details:err.stack, message:"Internal Server Error" };
    response_formatter.FormatResponse(req,res)
}