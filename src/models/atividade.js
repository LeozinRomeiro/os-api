const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

class Atividade {
  constructor(Atividade) {
    this.nome = Atividade.nome
    this.descricao = Atividade.descricao
  }
}

const AtividadesSequelize = sequelize.define(
  'Atividades',
  {
    AtividadeId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    Nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    // Com a utilização de sequelize, o nome da tabela é automaticamente definido como Clientes
    // Desabilita a criação automática de createdAt e updatedAt
    tableName: 'Atividades',
    timestamps: false
  }
)

module.exports = { Atividade, AtividadesSequelize }
