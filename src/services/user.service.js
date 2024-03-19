const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: 'SUCCESSFUL', data: users };
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'User does not exist' },
    };
  }
  return { status: 'SUCCESSFUL', data: user };
};

const createUser = async (newUser) => {
  const user = await User.findOne({ where: { email: newUser.email } });

  if (user) {
    return {
      status: 'CONFLICT',
      data: { message: 'User already registered' },
    };
  }
  const createdUser = await User.create(newUser);
  return { status: 'CREATED', data: createdUser };
};

const deleteUser = async (id) => {
  const deletedUser = await User.destroy({ where: { id } });

  if (deletedUser) {
    return { status: 'NO_CONTENT', data: 'Deleted Successfully' };
  }
  return { status: 'CONFLICT', data: 'Error trying to delete' };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
