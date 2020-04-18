/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var UserRoleModule =  sequelize.define('UserRole', {
    UserId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Roles: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'UserRole'
  });
  UserRoleModule.removeAttribute('id');

  return  UserRoleModule;
};
