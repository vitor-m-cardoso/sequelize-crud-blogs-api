/* eslint-disable max-lines */
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const { postService } = require('../services');

const createPost = async (req, res) => {
  try {
    const {
      body: newPost,
      locals,
    } = req;

    const { status, data } = await postService.createPost(newPost, locals.id);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const { status, data } = await postService.getAllPosts();

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, data } = await postService.getPostById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatePost = async (req, res) => {
  try {
    const {
      body: { title, content },
      params: { id },
      locals: { id: userId },
    } = req;

    const { status, data } = await postService.updatePost({ title, content, id, userId });

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.locals;

    const { status, data } = await postService.deletePost(id, userId);

    if (status === 'NO_CONTENT') {
      return res.status(204).end();
    }
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const searchPost = async (req, res) => {
  try {
    const { q } = req.query;
    const { status, data } = await postService.searchPost(q);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
