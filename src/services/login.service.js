const { User } = require('../models');

const getUserByEmail = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Invalid fields' },
    };
  }
  return { status: 'SUCCESSFUL', data: user };
};

module.exports = {
  getUserByEmail,
};
