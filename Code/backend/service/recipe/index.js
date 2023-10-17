const { AddNewRecipe, GetAllRecipes, GetTotalRecipeCount, getRecipeNameAutoComplete } = require('../../dao/recipes');
const logger = require('../../helpers/logger')(module);

module.exports.createNewRecipe = async (recipeData) => {
    try {
        const recipe = await AddNewRecipe(recipeData);
        return recipe;

    } catch (error) {
        logger.log('error', `Adding Recipe, error: ${error}`);
        throw (error);
    }
}

module.exports.getAllRecipe = async (filters, page, limit) => {
    try {
        return await GetAllRecipes(filters, page, limit);

    } catch (error) {
        logger.log('error', `Getting Recipe, error: ${error}`);
        throw (error);
    }
}

module.exports.getTotalRecipeCount = async () => {
    try {
        return await GetTotalRecipeCount();

    } catch (error) {
        logger.log('error', `Getting Total Records Of Recipe, error: ${error}`);
        throw (error);
    }
}

module.exports.getRecipeNameAutoComplete = async (query) => {
    try {
        const recipe = [];
        (await getRecipeNameAutoComplete(query)).forEach(a => {
            recipe.push(a.TranslatedRecipeName);
        });
        return recipe;
    } catch (error) {
        logger.log('error', `Getting Recipe Name Auto Complete , error: ${error}`);
        throw (error);
    }
}
