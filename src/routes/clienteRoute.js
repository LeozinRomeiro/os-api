const router = require('express').Router()
const clienteController = require('../controllers/clienteController')
const validarCliente = require('../middlewares/validarClienteMiddleware')

router
  .post('/', validarCliente, clienteController.cadastrar)
  .get('/', clienteController.buscarTodos)
  .get('/id/:id', clienteController.buscarPorId)
  .put('/id/:id', clienteController.atualizar)
  .get('/cnpj/:cnpj', clienteController.buscarPorCnpj)

module.exports = router
