const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

const jwtConfig = {
  expiresIn: '8h',
  algorithm: 'HS256',
};

const createToken = (email, id) => {
  const token = jwt.sign({ email, id }, secret, jwtConfig);

  return token;
};

const verify = (token) => {
  const decoded = jwt.verify(token, secret);

  return decoded;
};

module.exports = {
  createToken,
  verify,
};
