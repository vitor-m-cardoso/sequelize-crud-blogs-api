const router = require('express').Router();

const { postController } = require('../controllers');
const { postMiddleware, validateToken } = require('../middlewares');

router.get('/search', validateToken, postController.searchPost);
router.get('/:id', validateToken, postController.getPostById);
router.get('/', validateToken, postController.getAllPosts);

router.post(
  '/',
  validateToken,
  postMiddleware.validateFields,
  postMiddleware.validateCategoryIds,
  postController.createPost,
);

router.put(
  '/:id',
  validateToken,
  postMiddleware.validateBlogPostFields,
  postController.updatePost,
);

router.delete('/:id', validateToken, postController.deletePost);

module.exports = router;