const { verify } = require('../utils/auth');

const getToken = (bearerToken) => bearerToken.split(' ')[1];

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = getToken(authorization);
    const user = verify(token);

    req.locals = user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;
