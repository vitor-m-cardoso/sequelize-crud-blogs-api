const router = require('express').Router();

const { categoryController } = require('../controllers');
const { categoryMiddleware, validateToken } = require('../middlewares');

router.get('/', validateToken, categoryController.getAllCategories);

router.post(
  '/',
  validateToken,
  categoryMiddleware.validateCategoryName,
  categoryController.createCategory,
);

module.exports = router;
