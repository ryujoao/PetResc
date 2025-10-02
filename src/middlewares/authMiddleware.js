const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'pet123';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // mais limpo

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
    req.account = decoded;     next();
  });
};

module.exports = { authenticateToken };
