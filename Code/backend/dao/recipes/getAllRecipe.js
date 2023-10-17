const { Recipe } = require('../../dto/recipe');
const mongoose = require('mongoose');
const logger = require('../../helpers/logger')(module);

module.exports = async (page, limit = 10) => {
    try {
        const recipes = Recipe.find()
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
