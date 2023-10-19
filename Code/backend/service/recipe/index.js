const { completeChatMessage } = require("../../adapter/chatgpt");
const { getPhotoForResource } = require("../../adapter/pexel");
const {
  AddNewRecipe,
  GetAllRecipes,
  GetTotalRecipeCount,
  getRecipeNameAutoComplete,
  UpdateRecipe,
} = require("../../dao/recipes");
const logger = require("../../helpers/logger")(module);

module.exports.createNewRecipe = async (recipeData) => {
  try {
    const recipe = await AddNewRecipe(recipeData);
    return recipe;
  } catch (error) {
    logger.log("error", `Adding Recipe, error: ${error}`);
    throw error;
  }
};

module.exports.getAllRecipe = async (filters, page, limit) => {
  try {
    let recipes = await GetAllRecipes(filters, page, limit);
    console.log("RESP : ", recipes);
    if (Object.keys(filters).length > 0 && recipes.length == 0) {
      let gptResponse = await completeChatMessage(
        filters.ingredients,
        filters.cuisine,
        filters.name
      );
      if (gptResponse.choices.length > 0) {
        gptResponse = JSON.parse(gptResponse.choices[0]?.message?.content);
        let imageUrl = await getPhotoForResource(
          gptResponse.TranslatedRecipeName
        );
        gptResponse["imageUrl"] = imageUrl;
        recipes.push(gptResponse);
        // await AddNewRecipe(gptResponse);
      }
    }
    console.log("RECIPES ", recipes);
    return recipes;
  } catch (error) {
    logger.log("error", `Getting Recipe, error: ${error}`);
    throw error;
  }
};

module.exports.getTotalRecipeCount = async () => {
  try {
    return await GetTotalRecipeCount();
  } catch (error) {
    logger.log("error", `Getting Total Records Of Recipe, error: ${error}`);
    throw error;
  }
};

module.exports.getRecipeNameAutoComplete = async (query) => {
  try {
    const recipe = [];
    (await getRecipeNameAutoComplete(query)).forEach((a) => {
      recipe.push(a.TranslatedRecipeName);
    });
    return recipe;
  } catch (error) {
    logger.log("error", `Getting Recipe Name Auto Complete , error: ${error}`);
    throw error;
  }
};

module.exports.updateRecipe = async (updateData) => {
  try {
    const recipe = await UpdateRecipe(updateData);
    return recipe;
  } catch (error) {
    logger.log("error", `Adding Order, error: ${error}`);
    throw error;
  }
};
