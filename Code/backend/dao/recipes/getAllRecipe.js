const { Recipe } = require('../../dto/recipe');
const mongoose = require('mongoose');
const logger = require('../../helpers/logger')(module);

module.exports = async (filters, page, limit = 10) => {
    try {
        const dynamicFilters = {};

        if (filters.ingredents) {
            dynamicFilters.CleanedIngredients = { $in: filters.ingredents };
        }

        if (filters.Cuisine) {
            dynamicFilters.Cuisine = { $eq: filters.cuisine };
        }

        if (filters.totaltime) {
            dynamicFilters.TotalTimeInMins = { $gte: filters.totaltime }
        }

        const recipes = Recipe.find(dynamicFilters)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        return recipes;

    } catch (error) {
        console.log(error);
        logger.log('info', `Error in Creating a new recipe ${JSON.stringify(error)}`);
        throw (error);
    }
};
