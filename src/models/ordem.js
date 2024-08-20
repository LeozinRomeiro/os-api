const { sql, poolPromise } = require('../config/db');

class Ordem {
  constructor(ordem) {
    this.idAtividade = ordem.idAtividade;
    this.idCliente = ordem.idCliente;
    this.idPeriodo = ordem.idPeriodo;
    this.idTecnico = ordem.idTecnico;
    this.idProjeto = ordem.idProjeto;
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

  static async getById(){
    try {
      const pool = await poolPromise;
      const result = await pool.request().input('idOrdem', sql.VarChar, ordem.idOrdem).query('SELECT * FROM Orders WHERE OrdemID = @idOrdem');
      return result.recordset;
    } catch (err) {
      console.log(err);
    }
  }

  static async create(ordem) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idAtividade', sql.VarChar, ordem.idAtividade)
        .input('idCliente', sql.VarChar, ordem.idCliente)
        .input('idPeriodo', sql.VarChar, ordem.idPeriodo)
        .input('idTecnico', sql.VarChar, ordem.idTecnico)
        .input('idProjeto', sql.VarChar, ordem.idProjeto)
        //.input('createdAt', sql.DateTime, new Date())
        .query('INSERT INTO [OrdemDeServico] (AtividadeID, ClienteID, PeriodoID, FuncionarioID, ProjetoID) OUTPUT INSERTED.* VALUES (@idAtividade, @idCliente, @idPeriodo, @idTecnico, @idProjeto)');
      return result.recordset;
    } catch (err) {
      console.log(err);
    }
  }
  
}

module.exports = Ordem;