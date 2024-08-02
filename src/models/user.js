const { sql, poolPromise } = require('../config/db');

class Usuario {
    constructor(Usuario){
        this.id = Usuario.id
        this.name = Usuario.name;
        this.password = Usuario.password;
    }

    static async getById(){
        try {
            const pool = await poolPromise;
            const result = pool.request().query('SELECT TOP 1 * FROM User');
            return result.recordset;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports =  Usuario;