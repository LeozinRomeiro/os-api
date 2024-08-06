const data = require('../models/usuario')
const { hash } = require('bcryptjs')

class UsuarioService{

    async cadastrar(dto){

        try {
            const usuario = await data.getByEmail(dto.email)

            if (usuario) {
                throw new Error('Usuario ja cadastrado.')
            }
    
            const senhaHash = await hash(dto.senha, 8)
    
            const novoUsuario = await data.create({
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash,
            })
    
            return novoUsuario

        } catch (error) {
            throw Error("Erro ao cadastrar usuario:" + error.message)
        }
    }
}

module.exports = UsuarioService