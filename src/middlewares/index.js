const loginMiddlewares = require('./login.middleware');
const userMiddleware = require('./user.middleware');
const validateToken = require('./token.middleware');
const categoryMiddleware = require('./category.middleware');
const postMiddleware = require('./post.middleware');

module.exports = {
  loginMiddlewares,
  userMiddleware,
  validateToken,
  categoryMiddleware,
  postMiddleware,
};
