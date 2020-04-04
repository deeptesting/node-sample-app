//https://sequelize.org/master/manual/raw-queries.html

// Username: nlHDem7JeI
// Database name: nlHDem7JeI
// Password: vzbcC1xyEV
// Server: remotemysql.com
// Port: 3306

const config = require('config');
const Sequelize = require('sequelize');

const DBCONFIG = config.get('DBCONFIG');

const _sequelize = new Sequelize(DBCONFIG.Database_name,DBCONFIG.Username, DBCONFIG.Password, {
    dialect: 'mysql',
    host: DBCONFIG.Server,
    dialectOptions: {connectTimeout: DBCONFIG.connectTimeout}, // mariadb connector option
    logging: false,
    define: {
        timestamps: false
    }
  })

var DBContext = {};
DBContext._sequelize = _sequelize ;
DBContext.State = require('../models/State.js')(_sequelize,Sequelize);
DBContext.City = require('../models/City.js')(_sequelize,Sequelize);
DBContext.UserMaster = require('../models/UserMaster.js')(_sequelize,Sequelize);






module.exports = DBContext;