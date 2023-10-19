const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  TranslatedRecipeName: String,
  TranslatedInstructions: String,
  TotalTimeInMins: Number,
  Cuisine: String,
  URL: String,
  CleanedIngredients: [String],
  ImageURL: String,
  IngredientCount: Number,
});

module.exports.Recipe = mongoose.model("Recipe", recipeSchema, "recipe");

module.exports.recipeAddRequestSchema = Joi.object({
  TranslatedRecipeName: Joi.string().required(),
  TranslatedInstructions: Joi.string().required(),
  TotalTimeInMins: Joi.number().required(),
  Cuisine: Joi.string().required(),
  URL: Joi.string().uri(),
  CleanedIngredients: Joi.array().items(Joi.string()).required(),
  ImageUrl: Joi.string().uri().required(),
  IngredientCount: Joi.number().required(),
});
