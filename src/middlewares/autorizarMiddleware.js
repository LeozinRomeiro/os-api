const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, config.get('secret'));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido, autorização negada' });
  }
};

module.exports = authMiddleware;