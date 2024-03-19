/* eslint-disable max-lines */
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const { userService } = require('../services');
const { createToken } = require('../utils/auth');

const getAllUsers = async (_req, res) => {
  try {
    const { status, data } = await userService.getAllUsers();
    
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, data } = await userService.getUserById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    const { status, data } = await userService.createUser(newUser);

    if (status !== 'CREATED') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const token = createToken(data.email, data.id);
    return res.status(mapStatusHTTP(status)).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.locals;

    const { status, data } = await userService.deleteUser(id);

    if (status === 'NO_CONTENT') {
      return res.status(mapStatusHTTP(status)).end();
    }
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
