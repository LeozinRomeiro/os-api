const router = require('express').Router()
const atividadeController = require('../controllers/atividadeController')

router
    .post('/',atividadeController.cadastrar)
    .get('/',atividadeController.listar)
    .get('/id/:id',atividadeController.buscarPorId)
    .put('/id/:id',atividadeController.atualizar)
    .delete('/id/:id',atividadeController.deletar)

module.exports = router