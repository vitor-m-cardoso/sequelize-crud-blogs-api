const router = require('express').Router();

const {
  loginController,
} = require('../controllers');
const {
  loginMiddlewares,
} = require('../middlewares');

const { validateLogin } = loginMiddlewares;

router.post('/', validateLogin, loginController.login);

module.exports = router;