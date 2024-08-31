const { body, validationResult } = require('express-validator');

const ValidarPeriodo = [
    body('ordemID').notEmpty().withMessage('Por favor apontar ordem de serviço'),
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

module.exports = ValidarPeriodo;
    