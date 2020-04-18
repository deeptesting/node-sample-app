const { QueryTypes } = require('sequelize');

const DBContext = require('./databaselayer/DBContext');


const StateMethods = require('./businesslogiclayer/StateMethods');
const CityMethods = require('./businesslogiclayer/CityMethods');
const UserMethods = require('./businesslogiclayer/UserMethods');
const Utility_Mail = require('./thirdparty/utility_mail');
const Utility_Common = require('./utility/utilityCommon');
const Utility_Encryption = require('./thirdparty/utility_encryption');

async function Main(){
    // var insertedState = (await DBContext.State.create({
    //     State_Name : "Bihar",
    //     Code : "BI",
    //     Id :0
    // }) ).get({plain:true});
    // console.log("insertedState",insertedState);


    //const data = await  DBContext.State.findAll({  raw: true,  where: { id: [1,2,3] }      });
    //console.log(data);
    //const data = await  DBContext.State.findAll({  raw: true   });
   // data.forEach(element => console.log(element));
    
    // const data1 = await  StateMethods.GetStateDetailsByID(2);
    // console.log(data1);




    // var row_updated =  await  StateMethods.UpdateStateByID(
    // { State_Name : "Rajasthan",
    //     Code : "RJ"
    // },3)
    // console.log("row_updated",row_updated);

    //     const datas = await StateMethods.GetAllStates(); //await DBContext._sequelize.query("SELECT * FROM `State`", { type: QueryTypes.SELECT });
    // console.log(datas);

    var cityobj = {
        City_Name : "Indore",
        State_Id : 1
    }
  // var data = await CityMethods.UpdateCityByID(cityobj,1);
 
//   var pwd = Utility_Common.generatePassword(8);
//   console.log("pwd",pwd);

//   var hash = Utility_Encryption.CreatePasswordHash("79hBsfqF");
//   console.log("hash ",hash)

// var IsMatched = Utility_Encryption.IsMatchPasswordHash("79hBsfqF","$2b$10$g5r6BqOhoIY0QVo5HEYnfOLv2nFpoMVoCB2MRc5NIbE9bzN3VLYKq");
// console.log(IsMatched)



//    Utility_Mail.SendMail('deepuapps1991@gmail.com','Sending with Twilio SendGrid is Fun',
//    '<strong>and easy to do anywhere, even with Node.js</strong>'
//    )


// var rawprofileimg = 'public\\Content\\UserImage\\1587195434152.jpg';

// var data = Utility_Common.ReplaceAll(Utility_Common.ReplaceAll(rawprofileimg,'\\','/'),'public','static');
// console.log(data)

// var timeStamp = Math.floor(Date.now() / 1000);
// console.log(timeStamp)

 var data = await UserMethods.GetUserDetailsByEmail("test2@gmail.com");
console.log(data);
}

Main();