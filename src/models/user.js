const { sql, poolPromise } = require('../config/db');

class User {
    constructor(user){
        this.id = user.id
        this.name = user.name;
        this.password = user.password;
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

module.exports = User;