const data = require('../models/periodo')

class PeridoService {

    async criar(dto){
        try{

            

            return await data.create({DataInicio: dto.dataInicio, DataFim: dto.dataFim, OrdemID: dto.ordemID, TempoTotal: this.calcularTotal(dto).toString()})

        } catch (error) {
            throw new Error('Erro ao criar período: ' + error.message);
        }
    }

    async alterar(id, dto){
        try{

            await data.update({DataInicio: dto.dataInicio, DataFim: dto.dataFim, OrdemID: dto.ordemID,TempoTotal: this.calcularTotal(dto).toString()},{where: {PeriodoId: id},},)
            
            return this.buscarPorId(id)

        } catch (error) {
            throw new Error('Erro ao alterar período: ' + error.message);
        }
    }

    async deletar(id){
        try {
            
            await this.buscarPorId(id)

            await data.destroy({where:{PeriodoId: id}})

            return { message: 'Usuário deletado com sucesso.' }

        } catch (error) {
            throw new Error('Erro ao deletar período: ' + error.message);
        }
    }

    async buscarPorId(id){
        try {
            const periodo = await data.findByPk(id);

            if (!periodo) {
                throw new Error('Perido não encontrado');
            }
    
            return periodo;
        } catch (error) {
            throw new Error('Erro ao buscar período: ' + error.message);
        }
    }

    async buscar(){
        try {
            const periodo = await data.findAll();
            return periodo;
        } catch (error) {
            throw new Error('Erro ao buscar período: ' + error.message);
        }
    }

    calcularTotal(dto) {
        const diff = new Date(dto.dataFim) - new Date(dto.dataInicio);
        return diff / (1000 * 60 * 60);
    }

}

module.exports = PeridoService