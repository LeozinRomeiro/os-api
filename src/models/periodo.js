const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize') // Atualize o caminho conforme necessário

const Periodo = sequelize.define(
  'Periodo',
  {
    PeriodoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    DataInicio: {
      type: DataTypes.DATEONLY, // Use DATEONLY para armazenar apenas a data (sem hora)
      allowNull: false
    },
    DataFim: {
      type: DataTypes.DATEONLY, // Use DATEONLY para armazenar apenas a data (sem hora)
      allowNull: false
    },
    TempoTotal: {
      type: DataTypes.TEXT, // TEXT é adequado para armazenar textos longos
      allowNull: false
    }
  },
  {
    tableName: 'Periodo',
    timestamps: false // Se não houver createdAt e updatedAt
  }
)

module.exports = { Periodo }
