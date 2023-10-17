const { Recipe } = require('../../dto/receipe');
const mongoose = require('mongoose');
const logger = require('../../helpers/logger')(module);

module.exports = async (recipeData) => {
    try {
        const recipe = new Recipe({
            ...recipeData,
            _id: new mongoose.Types.ObjectId()
        });
        const saveRecipe = await recipe.save();
        logger.log('info', `Created a new recipe ${JSON.stringify(saveRecipe)}`);
        return saveRecipe;
    } catch (error) {
        console.log(error);
        logger.log('info', `Error in Creating a new recipe ${JSON.stringify(error)}`);
        throw (error);
    }
};
