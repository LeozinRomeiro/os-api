const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const OrdemDeServico = require('./ordem')

const Periodo = sequelize.define('Periodos', {
    PeriodoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    DataInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    DataFim: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    TempoTotal: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    OrdemID: {
        type: DataTypes.INTEGER,
        references: {
          model: OrdemDeServico,
          key: 'OrdemID',
        },
    }
    }, {
    tableName: 'Periodos',
    timestamps: false
});

OrdemDeServico.hasMany(Periodo, { foreignKey: 'OrdemID', as: 'Periodos' });
Periodo.belongsTo(OrdemDeServico, { foreignKey: 'OrdemID', as: 'OrdemDeServicos' });

module.exports = Periodo;