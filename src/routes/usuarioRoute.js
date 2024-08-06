const router = require('express').Router()
const UsuarioController = require('../controllers/usuarioController')
const validarUsuario = require('../middlewares/validarUsuarioMiddlewares');

router
    .post('/',validarUsuario,UsuarioController.cadastrar)
    .get('/',UsuarioController.cadastrar)
    .get('/id/:id',UsuarioController.cadastrar)
    .put('/id/:id',UsuarioController.cadastrar)
    .delete('/id/:id',UsuarioController.cadastrar)

module.exports = router