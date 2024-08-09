const UsuarioService = require('../services/usuarioService')

const usuarioService = new UsuarioService

exports.cadastrar = async (req, res) => {
    const {nome, email, senha} = req.body

    try {
        
        const usuario = await usuarioService.cadastrar({nome, email, senha})

        res.status(201).send(usuario)

    } catch (error) {
        res.status(400).send({message: error.message})
    }

};

exports.listar = async (req, res) => {
    try {
        const usuarios = await usuarioService.listar();
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await usuarioService.buscarPorId(id);
        if (!usuario) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }
        res.status(200).send(usuario);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.atualizar = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const usuarioAtualizado = await usuarioService.atualizar(id, { nome, email, senha });
        res.status(200).send(usuarioAtualizado);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.deletar = async (req, res) => {
    const { id } = req.params;

    try {
        await usuarioService.deletar(id);
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};