const router = require('express').Router()
const ordemController = require('../controllers/ordemController')
const validarOrdem = require('../middlewares/validarOrdemMiddleware')

router.post('/', validarOrdem, ordemController.cadastrar)
        .get('/', ordemController.buscar)
        .get('/id/:id', ordemController.buscarPorId)
        .get('/pdf/:id', ordemController.gerarPdf)
        .post('/previa', validarOrdem, ordemController.gerarPrevia);

module.exports = router;