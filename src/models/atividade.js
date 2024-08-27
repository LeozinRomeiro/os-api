const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

const Atividade = sequelize.define('Atividade', {
    AtividadeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Descricao: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'Atividade',
    timestamps: false,
  });

  module.exports = Atividade;