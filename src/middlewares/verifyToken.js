const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization'); // Obtén el encabezado 'Authorization'

  if (!authHeader) {
    return res.status(401).json({
      message: 'Access Denied: No Token Provided',
    });
  }
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Access Denied: Invalid Token Format',
    });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Access Denied: Token Missing',
    });
  }
  try {
    const verified = token === 'marioSuperToken';
    if (verified) {
      req.user = verified;
      next();
    } else {
      res.status(401).json({
        message: 'Invalid Token',
      });
    }
  } catch (error) {
    res.status(401).json({
      message: 'Invalid Token',
      error,
    });
  }
};
module.exports = verifyToken;
