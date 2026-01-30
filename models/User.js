const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Это готовое решение из библиотеки для хеширования пароля
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email "],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

// Это mongoose middleware - hashed password нужно задекларировать 2 метода 'genSalt()' - рандомные байты, 'hash()'
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generating token by using instance method
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, "jwtSecret", {
    expiresIn: "30d",
  });
};

module.exports = mongoose.model("User", UserSchema);
