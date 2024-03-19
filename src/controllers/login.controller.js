const { loginService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const { createToken } = require('../utils/auth');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { status, data } = await loginService.getUserByEmail(email, password);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const token = createToken(data.email, data.id);
    return res.status(mapStatusHTTP(status)).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error!' });
  }
};

module.exports = {
  login,
};
