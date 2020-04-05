/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserMaster', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    UserId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UserEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    RegistrationTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    FullName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    ProfileImage: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'UserMaster'
  });
};
