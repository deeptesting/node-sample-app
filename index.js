const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
var path = require('path');
const app_api_routes = require('./api/routes/route.js');
const error_handle = require('./api/middleware/ErrorHandle');
const response_formatter = require('./api/middleware/FormatResponse');
const APPDATA = require('./api/application_variable/AppVariable');

// create express app
const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use(express.static(__dirname))

//** ---------------------------For Static Files --------------------------- */
app.use('/static', express.static(__dirname + '/public'));
//** ---------------------------For Static Files  END--------------------------- */





// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


//Global Variable set
global.RootPath = path.resolve(__dirname);


app.use("/api",app_api_routes);




// ================ Internal Server Error Set Global err handling ==================
app.use(function (err, req, res, next) {
    console.log("here")
    error_handle.HandleError(err,req,res);
})



// define a simple route for base url
app.get('/', (req, res) => {
    res.send("Welcome to Demo application. ");
});

// ================ 404 Error  handling ==================
app.all('*', function(req, res){
    console.log("get * 404")
    res.status(APPDATA.HTTP_STATUS_CODE.PAGE_NOT_FOUND);
    res.body = {  message:"Url not found" };
    response_formatter.FormatResponse(req,res)
});




//** ---------------------------For Global Variable --------------------------- */
global.appRootDirectory = path.dirname(require.main.filename);
//** ---------------------------For Global Variable END --------------------------- */



// ############################ SERVER START ################################
const APPLICATION_PORT = config.get('APPLICATION_PORT');
var port = APPLICATION_PORT || 8080;
// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port "+port);
});