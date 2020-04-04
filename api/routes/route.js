const express = require('express');
var router = express.Router();
const ResponseFormatter = require('../middleware/FormatResponse.js');
const Authorization = require('../middleware/Authorization');




// ######################  Controller Declare ############################
var TestCntrlr = require('../controllers/TestController.js');
var UserCntrlr = require('../controllers/UserController.js');
var CityCntrlr = require('../controllers/CityController.js');

//######################  Controller Declare End #######################








//######################  ROUTING #######################
router.route('/test/home').get(TestCntrlr.HomePage,ResponseFormatter.FormatResponse);

router.route('/test/checkage').get(TestCntrlr.CheckAge,ResponseFormatter.FormatResponse);

router.route('/user/login').post(UserCntrlr.Login,ResponseFormatter.FormatResponse);
router.route('/user/dashboard').post(Authorization.Auth,UserCntrlr.Dashboard,ResponseFormatter.FormatResponse);


router.route('/city').post(Authorization.Auth,CityCntrlr.GetAllCities,ResponseFormatter.FormatResponse);
router.route('/city/insert').post(Authorization.Auth,CityCntrlr.InsertCity,ResponseFormatter.FormatResponse);
router.route('/city/:id').post(Authorization.Auth,CityCntrlr.GetCityByID,ResponseFormatter.FormatResponse);
router.route('/city/update/:id').post(Authorization.Auth,CityCntrlr.UpdateCity,ResponseFormatter.FormatResponse);




module.exports = router;