const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth"); // This is importing functions from Controllers

router.post("/register", register);
router.post("/login", login);

module.exports = router; // Here’s my router with all its routes, ready to be used elsewhere - Exposing the functions, objects, values
