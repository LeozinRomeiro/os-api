const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

class Funcionario {
  constructor(Funcionario) {
    this.nome = Funcionario.nome
    this.cpf = Funcionario.cpf
  }
}

const FuncionariosSequelize = sequelize.define(
  'Funcionarios',
  {
    FuncionarioID: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    Nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CPF: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    }
  },
  {
    // Com a utilização de sequelize, o nome da tabela é automaticamente definido como Clientes
    // Desabilita a criação automática de createdAt e updatedAt
    tableName: 'Funcionarios',
    timestamps: false
  }
)

module.exports = { Funcionario, FuncionariosSequelize }
