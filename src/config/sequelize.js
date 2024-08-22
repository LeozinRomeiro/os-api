const { Sequelize } = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(config.get('db.database'), config.get('db.user'), config.get('db.password'), {
  host: config.get('db.host'),
  dialect: 'mssql',
  port: config.get('db.port'),
  dialectOptions: {
    options: {
      encrypt: true, 
      trustServerCertificate: true 
    }
  }
});

module.exports = sequelize;