const { hash } = require('bcryptjs')
const { Usuario, UsuariosSequelize } = require('../models/usuario')

class UsuarioService {
  async cadastrar(dto) {
    try {
      const usuario = await UsuariosSequelize.findOne({
        where: {
          Email: dto.email
        }
      })

      if (usuario) {
        throw new Error('Usuario ja cadastrado.')
      }

      const senhaHash = await hash(dto.senha, 8)

      await UsuarioSequelize.create({
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash
      })

      // const novoUsuario = await UsuariosSequelize.findOne({
      //   where: {
      //     Email: dto.email
      //   }
      // })

      return this.informacoesUsuario(dto)
    } catch (error) {
      throw Error('Erro ao cadastrar usuario:' + error.message)
    }
  }

  async listar() {
    try {
      const usuarios = await UsuariosSequelize.findAll()

      const usuariosMap = usuarios.map(usuario =>
        this.informacoesUsuario(usuario)
      )
      return usuariosMap
    } catch (error) {
      throw new Error('Erro ao listar usuários: ' + error.message)
    }
  }

  async buscarPorId(id) {
    try {
      const usuario = await UsuariosSequelize.findByPk(id)

      if (!usuario) {
        throw new Error('Usuário não encontrado.')
      }

      return this.informacoesUsuario(usuario)
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message)
    }
  }

  async atualizar(id, dto) {
    try {
      const usuario = await UsuariosSequelize.findByPk(id)

      if (!usuario) {
        throw new Error('Usuário não encontrado.')
      }

      const senhaHash = dto.senha ? await hash(dto.senha, 8) : usuario.senha

      await UsuariosSequelize.update(
        {
          nome: dto.nome || usuario.nome,
          email: dto.email || usuario.email,
          senha: senhaHash
        },
        {
          where: {
            UsuarioId: id
          }
        }
      )

      // const usuarioAtualizado = await UsuariosSequelize.findByPk(id)

      return this.informacoesUsuario(dto)
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message)
    }
  }

  async deletar(id) {
    try {
      const usuario = await UsuariosSequelize.findByPk(id)

      if (!usuario) {
        throw new Error('Usuário não encontrado.')
      }

      await UsuarioSequelize.destroy({ where: { UsuarioId: id } })

      return { message: 'Usuário deletado com sucesso.' }
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message)
    }
  }
  informacoesUsuario(usuario) {
    const infoUsuario = new Usuario(usuario)
    return infoUsuario
  }
}

module.exports = UsuarioService
