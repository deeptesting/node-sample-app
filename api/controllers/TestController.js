const APPDATA = require('../application_variable/AppVariable');



module.exports.HomePage = function(req,res,next){

    var obj; obj.abc  ="fvsdf";

    
    // We dont use this kind of technique.
    //res.status(200).send({ message:"Welcome to Home Page" });
    res.status(APPDATA.HTTP_STATUS_CODE.OK);  
    res.body = { message:"Welcome to Home Page" }; next();
    
}





module.exports.CheckAge = function(req,res,next){

     var age = 18;
     if(req.query.age !=undefined){   age = req.query.age ; }
     if(age<18){
        res.status(APPDATA.HTTP_STATUS_CODE.FORBIDDEN);  
        res.body = { message:"Sorry Your age < 18" }; next();
     }

    res.status(APPDATA.HTTP_STATUS_CODE.OK);  
    res.body = { message:"Welcome to Test checkage Page " }; next();
    
}