const { body, validationResult } = require('express-validator')

const validateCliente = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('cnpj').notEmpty().withMessage('CNPJ inválido'),
  body('cnpj')
    .isLength({ min: 14, max: 14 })
    .withMessage('CNPJ deve possuir 14 dígitos'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map(error => `Erro: ${error.msg}`) })
    }
    next()
  }
]

module.exports = validateCliente
