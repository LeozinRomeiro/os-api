const { sql, poolPromise } = require('../config/db');

class Ordem {
  constructor(ordem) {
    this.idAtividade = ordem.idAtividade;
    this.idCliente = ordem.idCliente;
    this.idPeriodo = ordem.idPeriodo;
    this.idTecnico = ordem.idTecnico;
    this.dataHora = new Date();
  }

  static async getAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM Orders');
      return result.recordset;
    } catch (err) {
      console.log(err);
    }
  }

  static async create(orderData) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idAtividade', sql.VarChar, orderData.idAtividade)
        .input('idCliente', sql.VarChar, orderData.idCliente)
        .input('idPeriodo', sql.VarChar, orderData.idPeriodo)
        .input('idTecnico', sql.VarChar, orderData.idTecnico)
        .input('createdAt', sql.DateTime, new Date())
        .query('INSERT INTO Orders (description, client, status, createdAt) VALUES (@description, @client, @status, @createdAt)');
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Ordem;