var express = require("express");
var router = express.Router();
const logger = require("../../helpers/logger")(module);
const auth = require('../../middleware/auth');
const { recipeAddRequestSchema } = require('../../dto/recipe');
const { createNewRecipe, getAllRecipe, getTotalRecipeCount, getRecipeNameAutoComplete, updateRecipe } = require('../../service/recipe');


/**
 * @swagger
 * /api/v1/recipes/:
 *   get:
 *      tags:
 *          - recipes
 *      description: Returns the count of recipes and list of recipes
 *      parameters:
 *       - name: limit
 *         description: limit per page
 *         in: header
 *         type: int
 *      responses:
 *          200:
 *             description: A json containing a message
 *             schema:
 *                  type: object
 *                  properties:
 *                          message:
 *                              type: string
 *          401:
 *              description: Access Denied
 */
// name, ingredients, cuisine in query params
router.get("/", async function(req, res, next) {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
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

/**
 * @swagger
 * /api/v1/recipes/recipe/autocomplete/:query:
 *   get:
 *      tags:
 *          - recipes
 *      description: Returns suggestions for auto-completing in search bar
 *      parameters:
 *       - name: query
 *         description: input entered by the user
 *         in: path
 *         type: string
 *      responses:
 *          200:
 *             description: A json containing a message
 *             schema:
 *                  type: object
 *                  properties:
 *                          message:
 *                              type: string
 *          401:
 *              description: Access Denied
 */
// query in path params
router.get("/recipe/autocomplete/:query", async function(req, res, next) {
    try {
        const query = req.params.query;
        const recipes = await getRecipeNameAutoComplete(query);
        return res.status(200).json(recipes);
    } catch (error) {
        logger.log('error', `Recipe Creation Error Occurred ${error.message}`);
        return res.status(500).json({ message: error.message })
    }
});

/**
 * @swagger
 * /api/v1/recipes/recipe:
 *   post:
 *      tags:
 *          - recipes
 *      description: Adds new recipe to db
 *      parameters:
 *       - name: name
 *         description: title for the recipe
 *         in: header
 *         type: string
 *       - name: cuisine
 *         description: cuisine of the recipe
 *         in: header
 *         type: string
 *       - name: ingredients
 *         description: ingredients for the recipe
 *         in: header
 *         type: list<string>
 *       - name: time to cook
 *         description: time to cook the recipe
 *         in: header
 *         type: int
 *      responses:
 *          200:
 *             description: A json containing a message
 *             schema:
 *                  type: object
 *                  properties:
 *                          message:
 *                              type: string
 *          401:
 *              description: Access Denied
 */
// name, ingredients, cuisine, time to cook in query params
router.post("/recipe", auth, async function(req, res, next) {
    try {
        const { error } = recipeAddRequestSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const recipe = await createNewRecipe(req.body);
        return res.status(200).json({ message: "Success", recipe });
    } catch (error) {
        logger.log('error', `Recipe Creation Error Occurred ${error.message}`);
        return res.status(500).json({ message: error.message })
    }
});

/**
 * @swagger
 * /api/v1/recipes/recipe:
 *   put:
 *      tags:
 *          - recipes
 *      description: Modify a recipe in the db
 *      parameters:
 *       - name: name
 *         description: title for the recipe
 *         in: header
 *         type: string
 *       - name: cuisine
 *         description: cuisine of the recipe
 *         in: header
 *         type: string
 *       - name: ingredients
 *         description: ingredients for the recipe
 *         in: header
 *         type: list<string>
 *       - name: time to cook
 *         description: time to cook the recipe
 *         in: header
 *         type: int
 *      responses:
 *          200:
 *             description: A json containing a message
 *             schema:
 *                  type: object
 *                  properties:
 *                          message:
 *                              type: string
 *          401:
 *              description: Access Denied
 */
// name, ingredients, cuisine, time to cook in query params
router.put("/recipe", auth, async function(req, res, next) {
    try {
        const { error } = recipeAddRequestSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const recipe = await updateRecipe(req.body);
        return res.status(200).json({ message: "Success", recipe });
    } catch (error) {
        logger.log('error', `Recipe Updation Error Occurred ${error.message}`);
        return res.status(500).json({ message: error.message })
    }
});

module.exports = router;
