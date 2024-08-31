const OrdemService = require('../services/ordemService');

const ordemService = new OrdemService

exports.cadastrar = async (req, res) => {
  const { idProjeto, idAtividade, idCliente, idPeriodo, idTecnico} = req.body

  try {
        
    const ordem = await ordemService.cadastrar({ idProjeto, idAtividade, idCliente, idPeriodo, idTecnico})

    res.status(201).send(ordem)

  } catch (error) {
    res.status(400).send({message: error.message})
  }
    
}

exports.buscar = async (req, res) => {
  try {
      
      const ordens = await ordemService.buscar()

      res.status(200).send(ordens)

  } catch (error) {
      res.status(400).send({message: error.message});
  }
}


// exports.createOrder = async (req, res) => {
//   try {
//     const Ordem = new Order(req.body);
//     await Ordem.create(Ordem);
//     res.status(201).send(Ordem);
//   } catch (err) {
//     res.status(500).send('Erro no servidor');
//   }
// };