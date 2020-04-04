const { QueryTypes } = require('sequelize');
const DBContext = require('../databaselayer/DBContext');


var StateMethod = {};
  

/**
 * @param {Object} stateobj
 * @description :  To insert State
 * @example : {State_Name : "TEST", Code : "TT"}
 * @returns new inserted Object {Id: 5 , State_Name : "TEST", Code : "TT"}
 */
StateMethod.CreateState = async function (stateobj) { 
    var insertedItem = (await DBContext.State.create(stateobj)).get({plain:true});
    return insertedItem;
}


/**
 * @description :  To Get all states  
 * @returns List of all State objects []
 */
StateMethod.GetAllStates = async function () { 
    var datas = await  DBContext.State.findAll({  raw: true });
    return datas;
}


/**
 * @param {number} _id number
 * @description :  To Get State Details by id  
 * @returns Get the Object {Id: 5 , State_Name : "TEST", Code : "TT"}
 */
StateMethod.GetStateDetailsByID = async function (_id) { 
    var data = await  DBContext.State.findOne({  raw: true, where: { Id: _id } });
    return data;
}




/**
 * @param {Object} stateobj
 * @param {int} _id number for which it is to be update
 * @description :  To update State
 * @example : {State_Name : "TEST", Code : "TT"}
 * @returns [How_many_row_updated] like [1]
 */
StateMethod.UpdateStateByID = async function (stateobj,_id) { 
    var data = await  DBContext.State.update(stateobj,{ where: { Id: _id } });
    return data;
}





module.exports = StateMethod