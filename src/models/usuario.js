const { sql, poolPromise } = require('../config/db');

class Usuario {
    constructor(Usuario){
        this.id = Usuario.id;
        this.nome = Usuario.nome;
        this.email = Usuario.email;
        this.senha = Usuario.senha;
    }

    static async get() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .query('SELECT * FROM [Usuario]');
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
                .query('SELECT * FROM [Usuario] WHERE UsuarioId = @id');
            return result.recordset[0];
        } catch (error) {
            console.error('SQL error:', error);
        }
    }

    static async getByEmail(email) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .query('SELECT * FROM [Usuario] WHERE Email = @email');
                console.log(result);
            return result.recordset[0];
        } catch (error) {
            console.error('SQL error:', error);
        }
    }

    static async create(Usuario) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('nome', sql.NVarChar, Usuario.nome)
                .input('email', sql.NVarChar, Usuario.email)
                .input('senha', sql.NVarChar, Usuario.senha)
                .query('INSERT INTO [Usuario] (Nome, Email, Senha) VALUES (@nome, @email, @senha)');
            return result.rowsAffected;
        } catch (error) {
            console.error('SQL error:', error);
        }
    }

    static async update(Usuario) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, Usuario.id)
                .input('nome', sql.NVarChar, Usuario.nome)
                .input('email', sql.NVarChar, Usuario.email)
                .input('senha', sql.NVarChar, Usuario.senha)
                .query('UPDATE [Usuario] SET Nome = @nome, Email = @email, Senha = @senha WHERE UsuarioId = @id');
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
                .query('DELETE FROM [Usuario] WHERE UsuarioId = @id');
            return result.rowsAffected;
        } catch (error) {
            console.error('SQL error:', error);
        }
    }
}

module.exports =  Usuario;