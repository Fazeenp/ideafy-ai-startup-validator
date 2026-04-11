const authService = require("./auth.service");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = await authService.signup(name, email, password);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signupController, loginController };