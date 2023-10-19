const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  credentials: {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  username: { type: String, required: true },
  savedRecipes: [{ type: String }], // An array of strings
});

const User = mongoose.model("User", userSchema);

module.exports = User;
