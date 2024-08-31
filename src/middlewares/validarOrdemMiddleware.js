const { body, validationResult } = require('express-validator');

const ValidarOrdem = [
    body('idTecnico').notEmpty().withMessage('Tecnico responsavel é obrigatório'),
    body('idAtividade').notEmpty().withMessage('Atividade executada é obrigatório'),
    body('idCliente').notEmpty().withMessage('Necessario informar o cliente solicitante'),
    body('idProjeto'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = ValidarOrdem;

// {
//     "idTecnico":"1",
//     "idAtividade":"1",
//     "idProjeto":"1",
//     "idCliente":"1",
//     "idPeriodo":"1"
// }
