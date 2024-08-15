const data = require('../models/ordem')

class OrdemService{

    async cadastrar(dto){

        try {
            const Ordem = data.create({
                idTecnico: dto.idTecnico,
                idPeriodo:  dto.idPeriodo,
                idCliente: dto.idCliente,
                idAtividade: dto.idAtividade,
                idProjeto: dto.idProjeto
            })

            return Ordem

        } catch (error) {
            throw Error("Erro ao cadastrar ordem:" + error.message)
        }
    }

    // async listar() {
    //     try {
    //         const usuarios = await data.get();
    //         return usuarios;
    //     } catch (error) {
    //         throw new Error('Erro ao listar usuários: ' + error.message);
    //     }
    // }

    // async buscarPorId(id) {
    //     try {
    //         const usuario = await data.getById(id);

    //         if (!usuario) {
    //             throw new Error('Usuário não encontrado.');
    //         }

    //         return usuario;
    //     } catch (error) {
    //         throw new Error('Erro ao buscar usuário: ' + error.message);
    //     }
    // }

    // async atualizar(id, dto) {
    //     try {
    //         const usuario = await data.getById(id);

    //         if (!usuario) {
    //             throw new Error('Usuário não encontrado.');
    //         }

    //         const senhaHash = dto.senha ? await hash(dto.senha, 8) : usuario.senha;

    //         await data.update({
    //             id: id,
    //             nome: dto.nome || usuario.nome,
    //             email: dto.email || usuario.email,
    //             senha: senhaHash,
    //         });

    //         const usuarioAtualizado = await data.getById(id);

    //         return usuarioAtualizado;
    //     } catch (error) {
    //         throw new Error('Erro ao atualizar usuário: ' + error.message);
    //     }
    // }

    // async deletar(id) {
    //     try {
    //         const usuario = await data.getById(id);

    //         if (!usuario) {
    //             throw new Error('Usuário não encontrado.');
    //         }

    //         await data.delete(id);

    //         return { message: 'Usuário deletado com sucesso.' };
    //     } catch (error) {
    //         throw new Error('Erro ao deletar usuário: ' + error.message);
    //     }
    // }
}


module.exports = OrdemService