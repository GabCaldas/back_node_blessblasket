const jwtService = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const route = req.path
  const nonSecurityRoutes = ['/createuser', '/login', '/products','/delete/product/name']
  if (nonSecurityRoutes.includes(route)) {
    return next()
  }

  try {
    const tokenHeader = req.headers.authorization;
  
    if (!tokenHeader) {
      res.status(401).json({ message: 'Usuário não autorizado' });
      return;
    }
  
    const token = tokenHeader.split(' ')[1];
  
    if (!token) {
      res.status(401).json({ message: 'Usuário não autorizado' });
      return;
    }
  
    const secret = process.env.SECRET;
    await jwtService.verify(token, secret);
    return next();
  } catch (err) {
    res.status(401).json({ message: 'Usuário não autorizado' });
  }
}