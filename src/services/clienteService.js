const { Cliente, ClienteSequelize } = require('../models/cliente')

class ClienteService {
  async cadastrar(dto) {
    try {
      const cliente = await ClienteSequelize.create({
        Nome: dto.nome,
        CNPJ: dto.cnpj
      })
      return cliente
    } catch (error) {
      throw Error('Erro ao cadastrar novo cliente:' + error.sql)
    }
  }

  async buscarPorCNPJ(cnpj) {
    const cliente = await ClienteSequelize.findOne({
      where: {
        CNPJ: cnpj
      }
    })
    return cliente
  }

  async buscarPorId(id) {
    const cliente = await ClienteSequelize.findByPk(id)

    return cliente
  }

  async buscarPorNome(nome) {
    try {
      const cliente = await ClienteSequelize.findOne({
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

    if (clienteCNPJ) {
      throw new Error('Já existe um cliente com este CNPJ')
    }
    if (clienteNome) {
      throw new Error('Já existe um cliente com este Nome')
    }
  }

  async findAllClientes() {
    const clientes = await ClienteSequelize.findAll()
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
