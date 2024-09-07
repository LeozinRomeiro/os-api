const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')
const Projeto = require('./projeto')
const {Atividade, AtividadesSequelize} = require('./atividade')
const {Cliente, ClienteSequelize} = require('./cliente')
const Funcionario = require('./funcionario')

const Ordem = sequelize.define('OrdemDeServico', {
  OrdemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ProjetoID: {
    type: DataTypes.INTEGER,
    references: {
      model: Projeto,
      key: 'ProjetoID',
    },
  },
  ClienteID: {
    type: DataTypes.INTEGER,
    references: {
      model: ClienteSequelize,
      key: 'ClienteID',
    },
  },
  FuncionarioID: {
    type: DataTypes.INTEGER,
    references: {
      model: Funcionario,
      key: 'FuncionarioID',
    },
  },
  AtividadeID: {
    type: DataTypes.INTEGER,
    references: {
      model: AtividadesSequelize,
      key: 'AtividadeID',
    },
  },
}, {
  tableName: 'OrdemDeServico',
  timestamps: false,
});

Ordem.belongsTo(Projeto, { foreignKey: 'ProjetoID' });
Ordem.belongsTo(ClienteSequelize, { foreignKey: 'ClienteID' });
Ordem.belongsTo(Funcionario, { foreignKey: 'FuncionarioID' });
Ordem.belongsTo(AtividadesSequelize, { foreignKey: 'AtividadeID' });

ClienteSequelize.hasMany(Ordem, { foreignKey: 'ClienteID', as: 'Cliente' });
Funcionario.hasMany(Ordem, { foreignKey: 'FuncionarioID', as: 'Funcionario' });
Projeto.hasMany(Ordem, { foreignKey: 'ProjetoID', as: 'Projeto' });
AtividadesSequelize.hasMany(Ordem, { foreignKey: 'AtividadeID', as: 'Atividade' });

module.exports = Ordem
