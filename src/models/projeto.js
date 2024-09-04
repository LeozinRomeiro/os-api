const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')
const { Cliente, ClienteSequelize } = require('./cliente')

const Projetos = sequelize.define(
  'Projeto',
  {
    ProjetoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    tableName: 'Projetos',
    timestamps: false // Se não houver createdAt e updatedAt
  }
)

module.exports = Projetos
