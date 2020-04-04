/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('City', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    City_Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    State_Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'City'
  });
};
