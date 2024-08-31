const dataSequelize = require('../models/clienteSequelize')
const Cliente = require('../models/cliente')

class ClienteService {
  async cadastrar(dto) {
    try {
      const cliente = await dataSequelize.create({
        Nome: dto.nome,
        CNPJ: dto.cnpj
      })
      return cliente
    } catch (error) {
      throw Error('Erro ao cadastrar novo cliente:' + error.sql)
    }
  }

  async buscarPorCNPJ(cnpj) {
    const cliente = await dataSequelize.findOne({
      where: {
        CNPJ: cnpj
      }
    })
    return cliente
  }

  async buscarPorId(id) {
    const cliente = await dataSequelize.findByPk(id)
    if (cliente === null) {
      throw new Error('Cliente não encontrado com este Id')
    } else {
      return cliente
    }
  }

  async buscarPorNome(nome) {
    try {
      const cliente = await dataSequelize.findOne({
        where: {
          Nome: nome
        }
      })
      return cliente
    } catch (error) {
      throw new Error('Erro ao buscar cliente por ID:' + error)
    }
  }

  async validarUsuarioExistente(cnpj, nome) {
    const clienteCNPJ = await this.buscarPorCNPJ(cnpj)
    const clienteNome = await this.buscarPorNome(nome)

    console.log(clienteCNPJ, clienteNome)

    if (clienteCNPJ !== null) {
      throw new Error('Já existe um cliente com este CNPJ')
    }
    if (clienteNome !== null) {
      throw new Error('Já existe um cliente com este Nome')
    }
  }

  async findAllClientes() {
    const clientes = await dataSequelize.findAll()
    return clientes
  }

  async atualizarInfoCliente(id, dto) {
    try {
      await this.buscarPorId(id)

      await dataSequelize.update(
        {
          Nome: dto.nome,
          CNPJ: dto.cnpj
        },
        {
          where: {
            ClienteId: id
          }
        }
      )
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message)
    }
  }

  informacoesCliente(cliente) {
    const clienteInform = new Cliente(cliente)
    return clienteInform
  }
}

module.exports = ClienteService
