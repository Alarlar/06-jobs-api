const express = require("express"); // Setting up the router
const router = express.Router();

const { login, register } = require("../controllers/auth"); // This is importing functions from Controllers

router.post("/register", register); // Мы это передаем в контроллер
router.post("/login", login); // Вытащит из этой функции

module.exports = router; // Here’s my router with all its routes, ready to be used elsewhere - Exposing the functions, objects, values
