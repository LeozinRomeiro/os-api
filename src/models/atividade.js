const { sql, poolPromise } = require('../config/db');

class Atividade {
    constructor(Atividade) {
        this.id = Atividade.id;
        this.nome = Atividade.nome;
        this.descricao = Atividade.descricao;
    }

    static async get() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .query('SELECT * FROM [Atividade]');
            return result.recordset;
        } catch (error) {
            console.error('SQL error:', error);
        }
    }

    static async getById(id) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM [Atividade] WHERE AtividadeId = @id');
            return result.recordset[0];
        } catch (error) {
            console.error('SQL error:', error);
        }
    }

    static async getByName(descricao) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('descricao', sql.Char, descricao)
                .query('SELECT * FROM [Atividade] WHERE Descricao like @descricao');
            return result.recordset[0];
        } catch (error) {
            console.error('SQL error:', error);
        }
    }

    static async create(Atividade) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('nome', sql.NVarChar, Atividade.nome)
                .input('descricao', sql.NVarChar, Atividade.descricao)
                .query('insert into [Atividade] (nome, descricao) values (@nome, @descricao)');
            return result.rowsAffected;
        } catch (error) {
            console.error('SQL error:', error);
        }
    }

    static async update(Atividade) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, Atividade.id)
                .input('nome', sql.NVarChar, Atividade.nome)
                .input('descricao', sql.NVarChar, Atividade.descricao)
                .query('update [Atividade] set Nome = @nome, descricao = @descricao where AtividadeId = @id');
            return result.rowsAffected;
        } catch (error) {
            console.error('SQL error:', error);
        }
    }

    static async delete(id) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('delete from [Atividade] where AtividadeId = @id');
            return result.rowsAffected;
        } catch (error) {
            console.error('SQL error:', error);
        }
    }
}

module.exports =  Atividade;