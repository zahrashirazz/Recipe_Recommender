const { Recipe } = require('../../dto/recipe');
const mongoose = require('mongoose');
const logger = require('../../helpers/logger')(module);

module.exports = async (updateData) => {
    try {
        const updateRecipe = await Recipe.findOneAndUpdate(
            updateData.translatedRecipeName, updateData
        );
        logger.log('info', `Updated Recipe ${JSON.stringify(updateRecipe)}`);
        return updateRecipe;
    } catch (error) {
        console.log(error);
        logger.log('info', `Error in Updating a new Recipe ${JSON.stringify(error)}`);
        throw (error);
    }
};