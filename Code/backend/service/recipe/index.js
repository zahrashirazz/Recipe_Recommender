const { AddNewRecipe, GetAllRecipes, GetTotalRecipeCount } = require('../../dao/recipes');
const logger = require('../../helpers/logger')(module);

module.exports.createNewRecipe = async (recipeData) => {
    try {
        const recipe = await AddNewRecipe(recipeData);
        return recipe;

    } catch (error) {
        logger.log('error', `Adding Order, error: ${error}`);
        throw (error);
    }
}

module.exports.getAllRecipe = async (page, limit) => {
    try {
        return await GetAllRecipes(page, limit);

    } catch (error) {
        logger.log('error', `Adding Order, error: ${error}`);
        throw (error);
    }
}

module.exports.getTotalRecipeCount = async () => {
    try {
        return await GetTotalRecipeCount();

    } catch (error) {
        logger.log('error', `Adding Order, error: ${error}`);
        throw (error);
    }
}
