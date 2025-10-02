function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    const { role } = req.account; 

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    next();
  };
}

module.exports = authorizeRole;