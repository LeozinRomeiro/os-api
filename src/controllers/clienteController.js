const ClienteService = require('../services/clienteService')

const clienteService = new ClienteService()

exports.cadastrar = async (req, res) => {
  const { nome, cnpj } = req.body

  try {
    await clienteService.validarUsuarioExistente(cnpj, nome, res)

    const cliente = await clienteService.cadastrar({ nome, cnpj })
    res.status(201).send(clienteService.informacoesCliente(cliente))
  } catch (Error) {
    res.status(400).send({ message: Error.message })
  }
}

exports.buscarTodos = async (req, res) => {
  try {
    const clientes = await clienteService.findAllClientes()
    const clientesMap = clientes.map(cliente =>
      clienteService.informacoesCliente(cliente)
    )
    res.status(200).send(clientesMap)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params
    const cliente = await clienteService.buscarPorId(id)

    if (!cliente) {
      return res.send({ message: 'Cliente não encontrado com este Id' })
    }

    res.status(200).send(clienteService.informacoesCliente(cliente))
  } catch (error) {
    res.status(200).send({ message: error.message })
  }
}

exports.buscarPorCnpj = async (req, res) => {
  try {
    const { cnpj } = req.params
    const cliente = await clienteService.buscarPorCNPJ(cnpj)

    if (!cliente) {
      return res.send({ message: 'Cliente não encontrado com este CNPJ' })
    }

    res.status(200).send(clienteService.informacoesCliente(cliente))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, cnpj } = req.body

    await clienteService.atualizarInfoCliente(id, { nome, cnpj })

    res.status(200).send({ message: `Cliente ${nome} atualizado com sucesso` })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
