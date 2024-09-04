const { Atividade, AtividadesSequelize } = require('../models/atividade')
const { hash } = require('bcryptjs')

class AtividadeService {
  async listar() {
    try {
      const atividade = await AtividadesSequelize.findAll()

      return this.informacoesUsuario(atividade)
    } catch (error) {
      throw new Error('Erro ao listar atividade: ' + error.message)
    }
  }

  async buscarPorId(id) {
    try {
      const atividade = await AtividadesSequelize.findByPk(id)

      if (!atividade) {
        throw new Error('Atividade não encontrado.')
      }

      return this.informacoesUsuario(atividade)
    } catch (error) {
      throw new Error('Erro ao buscar atividade: ' + error.message)
    }
  }

  async buscarPorNome(descricao) {
    try {
      const atividade = await AtividadesSequelize.findOne({
        where: {
          Descricao: descricao
        }
      })

      if (!atividade) {
        throw new Error('Atividade não encontrado.')
      }

      return this.informacoesUsuario(atividade)
    } catch (error) {
      throw new Error('Erro ao buscar atividade: ' + error.message)
    }
  }

  async cadastrar(atv) {
    try {
      const atividade = await AtividadesSequelize.findByPk(atv.id)

      if (atividade) {
        throw new Error('Atividade já cadastrada')
      }

      await AtividadesSequelize.create({
        nome: atv.nome,
        descricao: atv.descricao
      })

      const novaAtividade = await AtividadesSequelize.findByPk(atv.id)

      return this.informacoesUsuario(novaAtividade)
    } catch (error) {
      throw Error('Erro ao cadastrar atividade:' + error.message)
    }
  }

  async atualizar(id, atv) {
    try {
      const atividade = await AtividadesSequelize.findByPk(id)

      if (!atividade) {
        throw new Error('Atividade não encontrada!')
      }

      await AtividadesSequelize.update(
        {
          nome: atv.nome || atividade.nome,
          descricao: atv.descricao || atividade.descricao
        },
        {
          where: {
            AtividadeId: id
          }
        }
      )

      const atividadeAtualizada = await AtividadesSequelize.findByPk(id)

      return this.informacoesUsuario(atividadeAtualizada)
    } catch (error) {
      throw new Error('Erro ao atualizar atividade! ' + error.message)
    }
  }

  async deletar(id) {
    try {
      const atividade = await AtividadesSequelize.findByPk(id)

      if (!atividade) {
        throw new Error('Atividade não encontrada!')
      }

      await AtividadesSequelize.destroy({ where: { AtividadeId: id } })

      return { message: 'Atividade deletada com sucesso.' }
    } catch (error) {
      throw new Error('Erro ao deletar atividade: ' + error.message)
    }
  }

  informacoesUsuario(atividade) {
    const infoAtividade = new Atividade(atividade)
    return infoAtividade
  }
}

module.exports = AtividadeService
