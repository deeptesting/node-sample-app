const { QueryTypes } = require('sequelize');
const DBContext = require('../databaselayer/DBContext');


var CityMethod = {};
  

/**
 * @param {Object} cityobj
 * @description :  To insert State
 * @example : {City_Name : "TEST", State_Id : 2}
 * @returns new inserted Object {Id: 5 , City_Name : "TEST", State_Id : 2}
 */
CityMethod.CreateCity = async function (cityobj) {  
        var insertedItem = (await DBContext.City.create(cityobj)).get({plain:true});
        return insertedItem; 
}


/**
 * @description :  To Get all Citis  
 * @returns List of all City objects []
 */
CityMethod.GetAllCitis = async function () { 
    var datas = await  DBContext.City.findAll({  raw: true });
    return datas;
}


/**
 * @param {number} _id number
 * @description :  To Get City Details by id  
 * @returns Get the Object {Id: 5 , City_Name : "TEST", State_Id : 2}
 */
CityMethod.GetCityDetailsByID = async function (_id) { 
    var data = await  DBContext.City.findOne({  raw: true, where: { Id: _id } });
    return data;
}




/**
 * @param {Object} cityobj
 * @param {int} _id number for which it is to be update
 * @description :  To update State
 * @example : {City_Name : "TEST", State_Id : 2}
 * @returns [How_many_row_updated] like [1]
 */
CityMethod.UpdateCityByID = async function (cityobj,_id) { 
    var data = await  DBContext.City.update(cityobj,{ where: { Id: _id } });
    return data;
}





module.exports = CityMethod