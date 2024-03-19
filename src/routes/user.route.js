const router = require('express').Router();

const { userController } = require('../controllers');
const {
  userMiddleware: {
    validateEmail,
    validatePassword,
    valitadeDisplayName,
  },
  validateToken,
} = require('../middlewares');

const valitadeUser = [valitadeDisplayName, validateEmail, validatePassword];

router.get('/:id', validateToken, userController.getUserById);
router.get('/', validateToken, userController.getAllUsers);

router.post('/', valitadeUser, userController.createUser);

router.delete('/me', validateToken, userController.deleteUser);

module.exports = router;