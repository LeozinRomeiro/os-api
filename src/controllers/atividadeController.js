const AtividadeService = require('../services/atividadeService')

const atividadeService = new AtividadeService

exports.listar = async (req, res) => {
    try {
        const atividade = await atividadeService.listar();
        res.status(200).send(atividade);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }    
};

exports.buscarPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const atividade = await atividadeService.buscarPorId(id);
        if (!atividade) {
            return res.status(404).send({ message: 'Atividade não encontrada!' });
        }
        res.status(200).send(atividade);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.cadastrar = async (req, res) => {
    const {nome, descricao} = req.body

    try {
        
        const atividade = await atividadeService.cadastrar({nome, descricao})

        res.status(201).send(atividade)

    } catch (error) {
        res.status(400).send({message: error.message})
    }
};

exports.atualizar = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
        const atividadeAtualizada = await atividadeService.atualizar(id, { nome, descricao });
        res.status(200).send(atividadeAtualizada);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        await atividadeService.deletar(id);
        res.status(200).send({ message: 'Atividade deletada com sucesso' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};