const OrdemService = require('../services/ordemService');
const PeriodoService = require('../services/periodoService');
const PdfService = require('../services/pdfService');

const ordemService = new OrdemService
const pdfService = new PdfService
const periodoService = new PeriodoService

exports.cadastrar = async (req, res) => {
  const { idProjeto, idAtividade, idCliente, idTecnico} = req.body

  try {
        
    const ordem = await ordemService.cadastrar({ idProjeto, idAtividade, idCliente, idTecnico})

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

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const ordem = await ordemService.buscarPorId(id)

    res.status(200).send(ordem)
  } catch (error) {
      res.status(400).send({message: error.message});
  }
}


exports.gerarPdf = async (req, res) => {
  try {
    const { id } = req.params;

    const ordem = await ordemService.buscarPorId(id);

    if (!ordem) {
      return res.status(404).json({ message: 'Ordem de Serviço não encontrada' });
    }

    const pdfBuffer = await pdfService.montarPdf(ordem);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ordem-servico-${id}.pdf`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.end(pdfBuffer, 'binary');// Enviar PDF como conteúdo binário
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    res.status(500).json({ message: error.message });
  }
}

exports.gerarPrevia = async (req, res) => {
  try {
    const { idProjeto, idAtividade, idCliente, idTecnico, dataInicio, dataFim} = req.body

    let ordem = await ordemService.cadastrar({ idProjeto, idAtividade, idCliente, idTecnico});

    let id = ordem.OrdemID

    await periodoService.criar({dataInicio, dataFim, id})

    ordem = await ordemService.buscarPorId(id)

    if (!ordem) {
      return res.status(404).json({ message: 'Ordem de Serviço não encontrada' });
    }

    const htmlContent = await pdfService.montarHtml(pdfService.defineHtml(true),{idProjeto, idAtividade, idCliente, idTecnico});

    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
  } catch (error) {
    console.error('Erro ao gerar prévia:', error);
    res.status(500).json({ message: error.message });
  }
}
