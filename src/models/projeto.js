const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const {Cliente,ClienteSequelize} = require('./cliente');

const Projeto = sequelize.define('Projeto', {
  ProjetoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ClienteID: {
    type: DataTypes.INTEGER,
    references: {
      model: ClienteSequelize,
      key: 'ClienteID',
    },
  },
}, {
  tableName: 'Projetos',
  timestamps: false,
});

Projeto.belongsTo(ClienteSequelize, { foreignKey: 'ClienteID' });

module.exports = Projeto;
