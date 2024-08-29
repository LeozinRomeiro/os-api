const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

const ClienteSequelize = sequelize.define(
  'Clientes',
  {
    ClienteId: {
      type: DataTypes.INTEGER,
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
    timestamps: false
  }
)

module.exports = ClienteSequelize
