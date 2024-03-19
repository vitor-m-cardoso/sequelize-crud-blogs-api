const mapStatusHTTP = require('../utils/mapStatusHTTP');

const { categoryService } = require('../services');

const getAllCategories = async (_req, res) => {
  try {
    const { status, data } = await categoryService.getAllCategories();

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const { status, data } = await categoryService.createCategory(name);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
