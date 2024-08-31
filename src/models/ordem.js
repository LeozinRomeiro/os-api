const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')
const Projeto = require('./projeto')
const Atividade = require('./atividade')
const Cliente = require('./clienteSequelize')
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
      model: Cliente,
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
      model: Atividade,
      key: 'AtividadeID',
    },
  },
}, {
  tableName: 'OrdemDeServico',
  timestamps: false,
});

Ordem.belongsTo(Projeto, { foreignKey: 'ProjetoID' });
Ordem.belongsTo(Cliente, { foreignKey: 'ClienteID' });
Ordem.belongsTo(Funcionario, { foreignKey: 'FuncionarioID' });
Ordem.belongsTo(Atividade, { foreignKey: 'AtividadeID' });

Cliente.hasMany(Ordem, { foreignKey: 'ClienteID', as: 'Cliente' });
Funcionario.hasMany(Ordem, { foreignKey: 'FuncionarioID', as: 'Funcionario' });
Projeto.hasMany(Ordem, { foreignKey: 'ProjetoID', as: 'Projeto' });
Atividade.hasMany(Ordem, { foreignKey: 'AtividadeID', as: 'Atividade' });

module.exports = Ordem;