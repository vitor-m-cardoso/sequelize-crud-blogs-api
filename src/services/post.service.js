/* eslint-disable max-lines */
const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const { Op } = Sequelize;

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createPost = async ({ title, content, categoryIds }, userId) => {
  const result = await sequelize.transaction(async (t) => {
    const createdPost = await BlogPost.create(
      { title, content, userId, published: new Date(), updated: new Date() },
      { transaction: t },
    );

    const createdCategory = await categoryIds.map(async (categoryId) => {
      await PostCategory.create({ postId: createdPost.id, categoryId }, { transaction: t });
    });
    await Promise.all(createdCategory);
    return { status: 'CREATED', data: createdPost.dataValues };
  });
  
  return result;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    attributes: { exclude: ['user_id'] },
  });

  return { status: 'SUCCESSFUL', data: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    attributes: { exclude: ['user_id'] },
  });

  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };

  return { status: 'SUCCESSFUL', data: post };
};

const updatePost = async ({ title, content, id, userId }) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [{
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
    attributes: { exclude: ['user_id'] },
  });
  if (blogPost.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }
  blogPost.title = title;
  blogPost.content = content;
  await blogPost.save();
  return { status: 'SUCCESSFUL', data: blogPost };
};

const deletePost = async (id, userId) => {
  const blogPost = await BlogPost.findOne({ where: { id } });

  if (!blogPost) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }

  if (blogPost.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }

  const deletedPost = await BlogPost.destroy({ where: { id } });

  if (deletedPost) {
    return { status: 'NO_CONTENT', data: deletedPost };
  } 
};

const searchPost = async (queryText) => {
  const blogPost = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${queryText}%` } },
        { content: { [Op.like]: `%${queryText}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFUL', data: blogPost };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
