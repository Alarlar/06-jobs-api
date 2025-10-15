const register = async (req, res) => {
  // Первая функция
  res.send("register user");
};
// Вторая функция
const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
