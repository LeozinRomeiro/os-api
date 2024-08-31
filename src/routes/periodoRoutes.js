const router = require('express').Router()
const periodoController = require('../controllers/periodoController')
const validarPeriodo = require('../middlewares/validarPeriodoMiddleware')

router
    .get('/', periodoController.buscar)
    .get('/:id', periodoController.buscarPorId)
    .put('/:id', validarPeriodo, periodoController.alterar)
    .post('/', validarPeriodo, periodoController.criar)
    .delete('/:id', periodoController.deletar)

module.exports = router;