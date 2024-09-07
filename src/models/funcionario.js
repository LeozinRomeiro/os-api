const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Funcionario = sequelize.define('Funcionario', {
    FuncionarioID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CPF: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'Funcionarios',
    timestamps: false,
  });
  
  module.exports = Funcionario;
  