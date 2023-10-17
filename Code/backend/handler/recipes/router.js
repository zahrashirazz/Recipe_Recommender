var express = require("express");
var router = express.Router();
const logger = require("../../helpers/logger")(module);
const auth = require('../../middleware/auth');
const { recipeAddRequestSchema } = require('../../dto/receipe');
const { createNewRecipe, getAllRecipe, getTotalRecipeCount, getRecipeNameAutoComplete, } = require('../../service/recipe');

router.get("/", async function(req, res, next) {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 2;
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;

        const recipeData = await getAllRecipe(req.query, page, limit);
        const totalData = await getTotalRecipeCount();
        return res.status(200).json({
            data: recipeData,
            limit: limit,
            currentPage: page,
            total: totalData
        });
    } catch (error) {
        logger.log('error', `Recipe Fetching Error Occured ${error.message}`);
        return res.status(500).json({ message: error.message });
    }

});


router.get("/recipe/autocomplete/:query", async function(req, res, next) {
    try {
        const query = req.params.query;
        const recipes = await getRecipeNameAutoComplete(query);
        return res.status(200).json(recipes);
    } catch (error) {
        logger.log('error', `Recipe Creation Error Occured ${error.message}`);
        return res.status(500).json({ message: error.message })
    }
});

router.post("/recipe", auth, async function(req, res, next) {
    try {
        const { error } = recipeAddRequestSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const recipe = await createNewRecipe(req.body);
        return res.status(200).json({ message: "Success", recipe });
    } catch (error) {
        logger.log('error', `Recipe Creation Error Occured ${error.message}`);
        return res.status(500).json({ message: error.message })
    }
});

module.exports = router;
