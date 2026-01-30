const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  console.log("Request body:", req.body);

  // ... Распаковка объекта,  создает копию объекта, а не передает ссылку
  const user = await User.create({ ...req.body });
  const token = user.createJWT(); // вытаскиваем токен

  console.log("User created successfully");

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
