const router = require('express').Router();
const atividadeController = require('../controllers/atividadeController');

router
    .post('/', atividadeController.cadastrar)
    .get('/', atividadeController.listar)
    .get('/:id', atividadeController.buscarPorId)
    .get('/descricao/:descricao', atividadeController.buscarPorNome)
    .put('/:id', atividadeController.atualizar)
    .delete('/:id', atividadeController.deletar);

module.exports = router;
