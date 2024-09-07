const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')
const Projeto = require('./projeto')
const {Atividade, AtividadesSequelize} = require('./atividade')
const {Cliente, ClienteSequelize} = require('./cliente')
const {FuncionariosSequelize} = require('./funcionario')

const Ordem = sequelize.define('OrdemDeServicos', {
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
      model: FuncionariosSequelize,
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
  tableName: 'OrdemDeServicos',
  timestamps: false,
});

Ordem.belongsTo(Projeto, { foreignKey: 'ProjetoID' });
Ordem.belongsTo(ClienteSequelize, { foreignKey: 'ClienteID' });
Ordem.belongsTo(FuncionariosSequelize, { foreignKey: 'FuncionarioID' });
Ordem.belongsTo(AtividadesSequelize, { foreignKey: 'AtividadeID' });

ClienteSequelize.hasMany(Ordem, { foreignKey: 'ClienteID', as: 'Clientes' });
FuncionariosSequelize.hasMany(Ordem, { foreignKey: 'FuncionarioID', as: 'Funcionarios' });
Projeto.hasMany(Ordem, { foreignKey: 'ProjetoID', as: 'Projetos' });
AtividadesSequelize.hasMany(Ordem, { foreignKey: 'AtividadeID', as: 'Atividades' });

module.exports = Ordem
