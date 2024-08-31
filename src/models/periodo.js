const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const OrdemDeServico = require('./ordem')

const Periodo = sequelize.define('Periodo', {
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
        type: DataTypes.STRING,
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
    tableName: 'Periodo',
    timestamps: false
});

OrdemDeServico.hasMany(Periodo, { foreignKey: 'OrdemID', as: 'Periodos' });
Periodo.belongsTo(OrdemDeServico, { foreignKey: 'OrdemID', as: 'OrdemDeServico' });

module.exports = Periodo;