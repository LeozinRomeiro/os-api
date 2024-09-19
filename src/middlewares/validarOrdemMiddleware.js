const { body, validationResult } = require('express-validator');

const ValidarOrdem = [
    body('idTecnico').notEmpty().withMessage('Tecnico responsavel é obrigatório'),
    body('idAtividade').notEmpty().withMessage('Atividade executada é obrigatório'),
    body('idCliente').notEmpty().withMessage('Necessario informar o cliente solicitante'),
    body('idProjeto').notEmpty().withMessage('Necessario informar o projeto do solicitante'),
    body('dataInicio').notEmpty().withMessage('Por favor definir a data inicial'),
    body('dataFim').notEmpty().withMessage('Por favor definir a data final'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = ValidarOrdem;

