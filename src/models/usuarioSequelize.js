const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const UsuarioSequelize = sequelize.define('Usuario', {
    UsuarioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
    tableName: 'Usuario',
    timestamps: false
});
  
module.exports = UsuarioSequelize;