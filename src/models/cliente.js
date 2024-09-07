const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

class Cliente {
  constructor(Cliente) {
    this.nome = Cliente.Nome
    this.cnpj = Cliente.CNPJ
  }
}

const ClienteSequelize = sequelize.define(
  'Clientes',
  {
    ClienteID: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    Nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CNPJ: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true
    }
  },
  {
    // Com a utilização de sequelize, o nome da tabela é automaticamente definido como Clientes
    // Desabilita a criação automática de createdAt e updatedAt
    tableName: 'Clientes',
    timestamps: false
  }
)

module.exports = { Cliente, ClienteSequelize }
