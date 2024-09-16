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
    let { idProjeto, idAtividade, idCliente, idTecnico, dataInicio, dataFim, idOrdem } = req.body;

    let ordem;
    if (idOrdem) {
      ordem = await ordemService.buscarPorId(idOrdem);
      if (!ordem) {
        return res.status(404).json({ message: 'Ordem de Serviço não encontrada' });
      }
      ordem = await ordemService.alterar(idOrdem,{ idProjeto, idAtividade, idCliente, idTecnico });
      idOrdem = ordem.OrdemID
      const periodos = await periodoService.buscarPorOrdemId(idOrdem)
      for (let periodo = 0; periodo < periodos.length; periodo++) {
        const PeriodoId = periodos[periodo].PeriodoID;
        await periodoService.alterar(PeriodoId,{dataInicio, dataFim, ordemID: idOrdem})
      }
    } else {
      ordem = await ordemService.cadastrar({ idProjeto, idAtividade, idCliente, idTecnico });
      idOrdem = ordem.OrdemID
      await periodoService.criar({dataInicio, dataFim, ordemID: idOrdem})
    }

    ordem = await ordemService.buscarPorId(idOrdem);

    const imageBuffer = await pdfService.montarImagem(ordem);

    if (!Buffer.isBuffer(imageBuffer)) {
      throw new Error('A imagem retornada não é um buffer válido.');
    }

    const imagemBase64 = imageBuffer.toString('base64');

    //res.setHeader('ordem-id', ordemID);
    //res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `inline; filename=ordem-servico-previa-${idOrdem}.png`);
    res.setHeader('Content-Length', imageBuffer.length);

    // Retorna o buffer da imagem
    //res.end(imageBuffer, 'binary');
    res.json({
      ordemID: idOrdem,
      imagem: `data:image/png;base64,${imagemBase64}`
    });
  } catch (error) {
    console.error('Erro ao gerar imagem de prévia:', error);
    res.status(500).json({ message: error.message });
  }
}
