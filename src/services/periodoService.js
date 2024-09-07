const cache = require('../config/cache')
const data = require('../models/periodo')

class PeridoService {

    async criar(dto){
        try{

            return await data.create({DataInicio: dto.dataInicio, DataFim: dto.dataFim, OrdemID: dto.ordemID, TempoTotal: this.calcularTotal(dto)})

        } catch (error) {
            throw new Error('Erro ao criar período: ' + error.message);
        }
    }

    async alterar(id, dto){
        try{

            await data.update({DataInicio: dto.dataInicio, DataFim: dto.dataFim, OrdemID: dto.ordemID,TempoTotal: this.calcularTotal(dto).toString()},{where: {PeriodoId: id},},)
            
            cache.del(`periodo_${id}`);
            cache.del(`todosPeriodos`);

            return this.buscarPorId(id)

        } catch (error) {
            throw new Error('Erro ao alterar período: ' + error.message);
        }
    }

    async deletar(id){
        try {
            
            await this.buscarPorId(id)

            await data.destroy({where:{PeriodoId: id}})
            cache.del(`periodo_${id}`);
            cache.del(`todosPeriodos`);

            return { message: 'Usuário deletado com sucesso.' }

        } catch (error) {
            throw new Error('Erro ao deletar período: ' + error.message);
        }
    }

    async buscarPorId(id){
        try {
            const cacheKey = `periodo_${id}`;
            let periodo = cache.get(cacheKey);

            if (!periodo) {
                periodo = await data.findByPk(id);
                if (!periodo) {
                    throw new Error('Perido não encontrado');
                }
                cache.set(cacheKey, periodo);
            }

            return periodo;
        } catch (error) {
            throw new Error('Erro ao buscar período: ' + error.message);
        }
    }

    async buscar(){
        try {
            const cacheKey = `todosPeriodos`;
            let periodos = cache.get(cacheKey);

            if (!periodos) {
                periodos = await data.findAll()
                cache.set(cacheKey, periodos)
            }

            return periodos;
        } catch (error) {
            throw new Error('Erro ao buscar período: ' + error.message);
        }
    }

    calcularTotal(dto) {
        const diff = new Date(dto.dataFim) - new Date(dto.dataInicio);
        const totalHoras = diff / (1000 * 60 * 60);
        return parseFloat(totalHoras.toFixed(2));
    }

}

module.exports = PeridoService