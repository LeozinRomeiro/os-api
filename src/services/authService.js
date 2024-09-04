const { Usuario, UsuariosSequelize } = require('../models/usuario')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const config = require('config')

class AuthService {
  async login(dto) {
    console.log(dto)
    const usuario = await UsuariosSequelize.findOne({
      where: {
        Email: dto.email
      }
    })

    if (!usuario) {
      throw new Error('Usuario não encontrado')
    }

    const authenticated = await compare(dto.senha, usuario.Senha)
    console.log(authenticated)

    if (authenticated) {
      throw new Error('Usuario ou senha incorreto')
    }

    const accessToken = sign(
      {
        id: usuario.id,
        name: usuario.name
      },
      config.get('secret'),
      {
        expiresIn: 86400
      }
    )

    return { accessToken }
  }
}

module.exports = AuthService
