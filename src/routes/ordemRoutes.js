const router = require('express').Router()
const ordemController = require('../controllers/ordemController')
const validarOrdem = require('../middlewares/validarOrdemMiddleware')

router.post('/', validarOrdem, ordemController.cadastrar)
        .get('/', ordemController.buscar);

module.exports = router;