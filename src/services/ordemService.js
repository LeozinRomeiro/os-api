const data = require('../models/ordem')
const Periodo = require('../models/periodo')
const Cliente = require('../models/cliente')
const Funcionario = require('../models/funcionario')
const Projeto = require('../models/projeto')
const Atividade = require('../models/atividade')

class OrdemService{

    async cadastrar(dto){

        try {
            const Ordem = data.create({
                idTecnico: dto.idTecnico,
                idPeriodo:  dto.idPeriodo,
                idCliente: dto.idCliente,
                idAtividade: dto.idAtividade,
                idProjeto: dto.idProjeto
            })

            return Ordem

        } catch (error) {
            throw Error("Erro ao cadastrar ordem:" + error.message)
        }
    }

    async buscar(){
        try {
            const ordens = await data.findAll({                
                include: [
                    {
                        model: Periodo,
                        as: 'Periodos' 
                    },
                    {
                        model: Cliente,
                        as: 'Cliente' 
                    },
                    {
                        model: Funcionario,
                        as: 'Funcionario' 
                    },
                    {
                        model: Projeto,
                        as: 'Projeto' 
                    },
                    {
                        model: Atividade,
                        as: 'Atividade' 
                    }]});

            return ordens;
        } catch (error) {
            throw new Error('Erro ao buscar ordens: ' + error.message);
        }
    }
}


module.exports = OrdemService