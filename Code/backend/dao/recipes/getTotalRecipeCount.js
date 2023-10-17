const { Recipe } = require('../../dto/receipe');
const mongoose = require('mongoose');
const logger = require('../../helpers/logger')(module);

module.exports = async () => {
    try {
        const recipes = Recipe.count();
        return recipes;
    } catch (error) {
        console.log(error);
        logger.log('info', `Error in Creating a new recipe ${JSON.stringify(error)}`);
        throw (error);
    }
};
