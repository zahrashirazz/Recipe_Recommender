const { Recipe } = require("../../dto/recipe");
const mongoose = require("mongoose");
const logger = require("../../helpers/logger")(module);

module.exports = async (query) => {
  try {
    const regex = new RegExp(query, "i");
    const results = await Recipe.find(
      { TranslatedRecipeName: regex },
      { TranslatedRecipeName: 1, _id: 0 }
    );
    return results;
  } catch (error) {
    console.log(error);
    logger.log("info", `Error in Searching a recipe ${JSON.stringify(error)}`);
    throw error;
  }
};
