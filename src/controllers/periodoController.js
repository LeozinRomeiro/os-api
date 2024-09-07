const PeridoService = require('../services/periodoService')

const periodoService = new PeridoService

exports.criar = async (req, res) => {
    const {dataInicio, dataFim, ordemID} = req.body

    try {
        
        const periodo = await periodoService.criar({dataInicio, dataFim, ordemID})

        res.status(201).send(periodo)

    } catch (error) {
        res.status(400).send({message: error.message});
    }
}

exports.buscar = async (req, res) => {
    try {
        
        const periodos = await periodoService.buscar()

        res.status(200).send(periodos)

    } catch (error) {
        res.status(400).send({message: error.message});
    }
}

exports.buscarPorId = async (req, res) => {
    const { id } = req.params

    try {
        
        const periodo = await periodoService.buscarPorId(id)

        res.status(200).send(periodo)

    } catch (error) {
        res.status(400).send({message: error.message});
    }
}

exports.alterar = async (req, res) => {
    const { id } = req.params
    const {dataInicio, dataFim, ordemID} = req.body

    try {
        
        const periodo = await periodoService.alterar(id, {dataInicio, dataFim, ordemID})

        res.status(200).send(periodo)

    } catch (error) {
        res.status(400).send({message: error.message});
    }
}

exports.deletar = async (req, res) => {
    const { id } = req.params

    try {
        
        await periodoService.deletar(id)

        res.status(200).send("Periodo deletado com sucesso")

    } catch (error) {
        res.status(400).send({message: error.message})
    }
}