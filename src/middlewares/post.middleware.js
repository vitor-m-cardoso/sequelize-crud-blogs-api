const { categoryService } = require('../services');

const validateFields = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;

  const promise = categoryIds.map(async (categoryId) => {
    const { status } = await categoryService.getCategoryById(categoryId);
    if (status === 'NOT_FOUND') {
      return status;
    }
  });
  const result = await Promise.all(promise);

  if (result.includes('NOT_FOUND')) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

const validateBlogPostFields = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  validateFields,
  validateCategoryIds,
  validateBlogPostFields,
};
