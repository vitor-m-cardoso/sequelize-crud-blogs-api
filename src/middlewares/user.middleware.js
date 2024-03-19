const valitadeDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  const minLength = 8;

  if (displayName.length < minLength) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  if (!isValid) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const minLength = 6;
  if (password.length < minLength) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

module.exports = {
  valitadeDisplayName,
  validateEmail,
  validatePassword,
};