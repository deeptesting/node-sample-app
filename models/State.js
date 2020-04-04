/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('State', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    State_Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Code: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'State'
  });
};
