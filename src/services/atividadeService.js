const data = require('../models/atividade')
const { hash } = require('bcryptjs')

class AtividadeService{

    async listar() {
        try {
            const atividade = await data.get();
            return atividade;
        } catch (error) {
            throw new Error('Erro ao listar atividade: ' + error.message);
        }
    }

    async buscarPorId(id) {
        try {
            const atividade = await data.getById(id);

            if (!atividade) {
                throw new Error('Atividade não encontrado.');
            }

            return atividade;
        } catch (error) {
            throw new Error('Erro ao buscar atividade: ' + error.message);
        }
    }

    async buscarPorNome(descricao) {
        try {
            const atividade = await data.getByName(descricao);

            if (!atividade) {
                throw new Error('Atividade não encontrado.');
            }

            return atividade;
        } catch (error) {
            throw new Error('Erro ao buscar atividade: ' + error.message);
        }
    }

    async cadastrar(atv) {
        try {
            // Cria a nova atividade e recebe o ID dela
            const novaAtividadeId = await data.create({
                nome: atv.nome,
                descricao: atv.descricao,
            });
    
            // Agora busque a atividade completa usando o ID
            const novaAtividade = await data.getById(novaAtividadeId);
    
            if (!novaAtividade) {
                throw new Error("Atividade não encontrada após criação.");
            }
    
            return novaAtividade;
    
        } catch (error) {
            throw new Error("Erro ao cadastrar atividade: " + error.message);
        }
    }
    
    
    
    

    async atualizar(id, atv) {
        try {
            const atividade = await data.getById(id);

            if (!atividade) {
                throw new Error('Atividade não encontrada!');
            }

            await data.update({
                id: id,
                nome: atv.nome || atividade.nome,
                descricao: atv.descricao || atividade.descricao,
            });

            const atividadeAtualizada = await data.getById(id);

            return atividadeAtualizada;
        } catch (error) {
            throw new Error('Erro ao atualizar atividade! ' + error.message);
        }
    }

    async deletar(id) {
        try {
            const atividade = await data.getById(id);

            if (!atividade) {
                throw new Error('Atividade não encontrada!');
            }

            await data.delete(id);

            return { message: 'Atividade deletada com sucesso.' };
        } catch (error) {
            throw new Error('Erro ao deletar atividade: ' + error.message);
        }
    }
}

module.exports = AtividadeService