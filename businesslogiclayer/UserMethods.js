const { QueryTypes } = require('sequelize');
const ENCRYPTION = require('../thirdparty/utility_encryption');
const UTILITY_MAIL = require('../thirdparty/utility_mail');
const UTILITY_COMMON = require('../utility/utilityCommon');
const DBContext = require('../databaselayer/DBContext');


const UserSplitOperator = "__";


var UserMethod = {};

UserMethod.createPassKey = function (user) { 
       var string =  user.Id + UserSplitOperator + user.UserEmail ;
        return ENCRYPTION.Encrypt(string);
}

UserMethod.verifyPassKey =  function (passkey,user) {
        var string =  user.Id + UserSplitOperator + user.UserEmail ;
        try{
               var dycrypt= ENCRYPTION.Decrypt(passkey);
               return (dycrypt== string);
        }catch(ex){return false; }    
}



/**
 * @param {Object} userobj
 * @description :  To insert User
 * @example : {
                  UserId: UTILITY_COMMON.UUID(),
                  UserEmail: req.body.useremail,
                  Password: CreatedPassword,
                  RegistrationTime: timeStamp,
                  FullName: req.body.fullname,
                  Phone: req.body.phone || null,
                  Address: req.body.address || null,
                  CityId: req.body.cityid,
                  IsActive: 1,
                  ProfileImage: profileImage,
            }
 * @returns new inserted Object {Id: 5 ,
                  UserId: UTILITY_COMMON.UUID(),
                  UserEmail: req.body.useremail,
                  Password: CreatedHashPassword,
                  RegistrationTime: timeStamp,
                  FullName: req.body.fullname,
                  Phone: req.body.phone || null,
                  Address: req.body.address || null,
                  CityId: req.body.cityid,
                  IsActive: 1,
                  ProfileImage: profileImage,
            }
 */
UserMethod.CreateUser = async function (userobj,commaseparator_roles="user") { 
        var rawPassword = userobj.Password ;
        var rawEmail = userobj.UserEmail ;

        userobj.Password = ENCRYPTION.CreatePasswordHash(userobj.Password);
        try{
                var insertedItem = (await DBContext.UserMaster.create(userobj)).get({plain:true});
                

                UTILITY_MAIL.SendMail(rawEmail,"Registration Successful "+rawEmail,
                `<strong>Successful Registration</strong><br/>
                <strong>Email : </strong> ${rawEmail}<br/>
                <strong>Password : </strong> ${rawPassword}<br/><br/><br/> Thanks`
                )
                
                var UserObj = {
                        UserEmail: insertedItem.UserEmail,
                        FullName: insertedItem.FullName,
                        Phone: insertedItem.Phone,
                        ProfileImage: UTILITY_COMMON.GetImageUrl(insertedItem.ProfileImage),
                }
                var userRoleObj = {
                        "UserId" :  insertedItem.UserId,
                        "Roles" : commaseparator_roles
                }
                var insertedRoleItem = (await DBContext.UserRole.create(userRoleObj)).get({plain:true});

                return UserObj;
        }catch(ex){
                 
                var ErrorMessagessArr = ex.errors.map((errItem)=>errItem.message);
                return {error:ErrorMessagessArr[0]};
        }
        
        
}



/**
 * @param {string} _userEmail EmailId string
 * @description :  To Get User Details by Email  
 * @returns Get the Object 
        * { Id: 8,
        UserId: '1f42f8d3-0856-47e7-9397-61223c0e3c40',
        UserEmail: 'test2@gmail.com',
        Roles: 'user',
        RegistrationTime: '2020-04-18T09:38:40.000Z',
        FullName: 'Deep',
        Phone: '8777785962',
        Address: 'Birati, kolkata -51',
        CityId: 1,
        IsActive: 1,
        ProfileImage: 'localhost:3000/static/Content/UserImage/1587202710094.jpg',
        City_Name: 'Indore',
        State_Id: 1,
        State_Name: 'Madhya Pradesh',
        Code: 'MP' }
 */
UserMethod.GetUserDetailsByEmail = async function (_userEmail) { 

    var sqlQuery = `SELECT 
    UM.\`Id\`, 
    UM.\`UserId\`, 
    UM.\`UserEmail\`, 
    UM.\`Password\`,
    UR.\`Roles\`, 
    UM.\`RegistrationTime\`, 
    UM.\`FullName\`, 
    UM.\`Phone\`, 
    UM.\`Address\`, 
    UM.\`CityId\`, 
    UM.\`IsActive\`, 
    UM.\`ProfileImage\`,
    CT.\`City_Name\`,
    CT.\`State_Id\`,
    ST.\`State_Name\`,
    ST.\`Code\`
    
    
     FROM \`UserMaster\` UM
    inner join \`City\` CT on ( UM.CityId = CT.id )
    inner join \`State\` ST on ( CT.State_Id =  ST.id )
    left outer join \`UserRole\` UR on ( UM.Userid = UM.UserId ) 
    where UM.\`UserEmail\` = '${_userEmail}' `;

    var userdata = await DBContext._sequelize.query(sqlQuery, { type: QueryTypes.SELECT });

    if(userdata!=undefined && userdata!=null && userdata.length>0){
        var UserObj = JSON.parse(JSON.stringify(userdata))[0];
        UserObj.ProfileImage =  UTILITY_COMMON.GetImageUrl(UserObj.ProfileImage);
        delete(UserObj.Password);
        return UserObj;
    }
    return null;
}
    




UserMethod.CheckUserEmailPasswordRoles = async function (_userEmail,_rawpassword,_targetroles="") { 

        var sqlQuery = `SELECT 
        UM.\`UserEmail\`, 
        UM.\`Password\`,
        UR.\`Roles\` 

         FROM \`UserMaster\` UM
        left outer join \`UserRole\` UR on ( UM.Userid = UM.UserId ) 
        where UM.\`IsActive\`=1 and  UM.\`UserEmail\` = '${_userEmail}' `;
    
        var userdata = await DBContext._sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
         
        if(userdata!=undefined && userdata!=null && userdata.length>0){
            var UserObj = JSON.parse(JSON.stringify(userdata))[0];
  
            var IsPasswordMatched = ENCRYPTION.IsMatchPasswordHash(_rawpassword,UserObj.Password);
           
            return IsPasswordMatched;
        }

        return false;
    }
    



module.exports = UserMethod