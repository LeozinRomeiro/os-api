const data = require('../models/ordem')
const Periodo = require('../models/periodo')
const { Cliente, ClienteSequelize } = require('../models/cliente')
const { Funcionario, FuncionariosSequelize } = require('../models/funcionario')
const Projeto = require('../models/projeto')
const { Atividade, AtividadesSequelize } = require('../models/atividade')

class OrdemService{

    async cadastrar(dto){

        try {
            const Ordem = data.create({
                FuncionarioID: dto.idTecnico,
                ClienteID: dto.idCliente,
                AtividadeID: dto.idAtividade,
                ProjetoID: dto.idProjeto
            })

            return Ordem

        } catch (error) {
            throw Error("Erro ao cadastrar ordem:" + error.message)
        }
    }

    async alterar(id, dto){
        try{

            await data.update({               
                FuncionarioID: dto.idTecnico,
                ClienteID: dto.idCliente,
                AtividadeID: dto.idAtividade,
                ProjetoID: dto.idProjeto},{where: {OrdemID: id},},)

            return this.buscarPorId(id)

        } catch (error) {
            throw new Error('Erro ao alterar ordem: ' + error.message);
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
                        model: ClienteSequelize,
                        as: 'Cliente' 
                    },
                    {
                        model: FuncionariosSequelize,
                        as: 'Funcionario' 
                    },
                    {
                        model: Projeto,
                        as: 'Projeto' 
                    },
                    {
                        model: AtividadesSequelize,
                        as: 'Atividade' 
                    }]});

            return ordens;
        } catch (error) {
            throw new Error('Erro ao buscar ordens: ' + error.message);
        }
    }

    async buscarPorId(id){
        try {
            const ordem = await data.findByPk(id,{                
                include: [
                    {
                        model: Periodo,
                        as: 'Periodos' 
                    },
                    {
                        model: ClienteSequelize,
                        as: 'Cliente' 
                    },
                    {
                        model: FuncionariosSequelize,
                        as: 'Funcionario' 
                    },
                    {
                        model: Projeto,
                        as: 'Projeto' 
                    },
                    {
                        model: AtividadesSequelize,
                        as: 'Atividade' 
                    }]});

            return ordem;
        } catch (error) {
            throw new Error('Erro ao buscar ordens: ' + error.message);
        }
    }
}


module.exports = OrdemService