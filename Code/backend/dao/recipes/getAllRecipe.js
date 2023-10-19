const { Recipe } = require("../../dto/recipe");
const mongoose = require("mongoose");
const logger = require("../../helpers/logger")(module);

module.exports = async (filters, page, limit = 10) => {
  try {
    const dynamicFilters = {};

    if (filters.ingredients) {
      dynamicFilters.CleanedIngredients = { $in: filters.ingredients };
    }

    if (filters.cuisine) {
      dynamicFilters.Cuisine = { $eq: filters.cuisine };
    }

    if (filters.totaltime) {
      dynamicFilters.TotalTimeInMins = { $gte: filters.totaltime };
    }
    console.log(" FITLERS ", dynamicFilters);
    const recipes = Recipe.find(dynamicFilters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    return recipes;
  } catch (error) {
    console.log(error);
    logger.log(
      "info",
      `Error in Creating a new recipe ${JSON.stringify(error)}`
    );
    throw error;
  }
};
