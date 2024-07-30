const sql = require('mssql');
const config = require('config');

const dbConfig = {
  user: config.get('db.user'),
  password: config.get('db.password'),
  server: config.get('db.server'),
  database: config.get('db.database'),
  options: {
    encrypt: config.get('db.options.encrypt'),
    enableArithAbort: config.get('db.options.enableArithAbort'),
    trustServerCertificate: config.get('db.options.trustServerCertificate')
  },
  port: config.get('db.port')
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Conectado com SQL Server');
    return pool;
  })
  .catch(err => console.log('Falha na conexão com o banco de dados, detalhes: ', err));

module.exports = {
  sql, poolPromise
};