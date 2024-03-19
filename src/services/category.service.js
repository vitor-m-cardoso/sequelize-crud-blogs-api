const { Category } = require('../models');

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return { status: 'SUCCESSFUL', data: categories };
};

const getCategoryById = async (id) => {
  const category = await Category.findOne({ where: id });

  if (!category) {
    return { status: 'NOT_FOUND', data: { message: 'one or more "categoryIds" not found' } };
  }
  return { status: 'SUCCESSFUL', data: category };
};

const createCategory = async (name) => {
  const { id } = await Category.create({ name });
  return { status: 'CREATED', data: { id, name } };
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};
