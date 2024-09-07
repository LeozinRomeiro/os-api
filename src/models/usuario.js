const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

class Usuario {
  constructor(Usuario) {
    this.nome = Usuario.Nome
    this.email = Usuario.Email
  }
}

const UsuariosSequelize = sequelize.define(
  'Usuarios',
  {
    UsuarioID: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    Nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    Senha: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    tableName: 'Usuarios',
    timestamps: false
  }
)

module.exports = { Usuario, UsuariosSequelize }
