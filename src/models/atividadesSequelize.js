const Atividade = require('../models/atividade');

class AtividadeService {
  static async get() {
    try {
      return await Atividade.findAll();
    } catch (error) {
      console.error('Error fetching atividades:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      return await Atividade.findByPk(id);
    } catch (error) {
      console.error('Error fetching atividade by id:', error);
      throw error;
    }
  }

  static async getByName(descricao) {
    try {
      return await Atividade.findOne({
        where: {
          descricao: {
            [Op.like]: `%${descricao}%`
          }
        }
      });
    } catch (error) {
      console.error('Error fetching atividade by name:', error);
      throw error;
    }
  }

  static async create(atividadeData) {
    try {
      return await Atividade.create(atividadeData);
    } catch (error) {
      console.error('Error creating atividade:', error);
      throw error;
    }
  }

  static async update(id, atividadeData) {
    try {
      const atividade = await Atividade.findByPk(id);
      if (atividade) {
        return await atividade.update(atividadeData);
      }
      return null;
    } catch (error) {
      console.error('Error updating atividade:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const atividade = await Atividade.findByPk(id);
      if (atividade) {
        return await atividade.destroy();
      }
      return null;
    } catch (error) {
      console.error('Error deleting atividade:', error);
      throw error;
    }
  }
}

module.exports = AtividadeService;