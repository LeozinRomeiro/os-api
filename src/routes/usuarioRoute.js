const router = require('express').Router()
const usuarioController = require('../controllers/usuarioController')
const validarUsuario = require('../middlewares/validarUsuarioMiddlewares')
const autotizarAcesso = require('../middlewares/autorizarMiddleware')

//router.use(autotizarAcesso)

router
    .post('/',autotizarAcesso,validarUsuario,usuarioController.cadastrar)
    .get('/',usuarioController.listar)
    .get('/id/:id',usuarioController.buscarPorId)
    .put('/id/:id',usuarioController.atualizar)
    .delete('/id/:id',usuarioController.deletar)

module.exports = router