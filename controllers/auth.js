const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs"); // Это готовое решение из библиотеки для хеширования пароля

const register = async (req, res) => {
  // Деструктуризация объекта - извлечение свойств из объекта в отдельные переменные
  const { name, email, password } = req.body;

  // Чтоб установить hashed password нужно задекларировать 2 метода 'genSalt()' - рандомные байты, 'hash()'
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };

  // ... Распаковка объекта,  создает копию объекта, а не передает ссылку
  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
