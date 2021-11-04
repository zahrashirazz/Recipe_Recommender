import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let recipes;
//Function to connect to DB
export default class RecipesDAO {
  static async injectDB(conn) {
    if (recipes) {
      return;
    }
    try {
      recipes = await conn.db(process.env.RECIPES_NS).collection("recipe");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in recipesDAO: ${e}`
      );
    }
  }
  //Function to get the Recipe List
  static async getRecipes({
    filters = null,
    page = 0,
    recipesPerPage = 10,
  } = {}) {
    let query;
    if (filters) {
      if ("CleanedIngredients" in filters) {
        // query = {
        //   $text: { $search: "filters["CleanedIngredients"][0]" },
        //   Cuisine: filters["Cuisine"],
        // };
        var str = "";
        // const str1 = "milk";
        // const str2 = "tomato";
        // str+="(?=.*" + str1 + ")";
        // str+="(?=.*" + str2 + ")";
        for (var i = 0; i < filters["CleanedIngredients"].length; i++) {
          const str1 = filters["CleanedIngredients"][i];
          str += "(?=.*" + str1 + ")";
        }
        query = { "Cleaned-Ingredients": { $regex: str } };
        query["Cuisine"] = filters["Cuisine"];
        // var str = "";
        // for(var i=0;i<filters["CleanedIngredients"].length;i++){
        //   str = str + String.raw'(?=.*'+filters["CleanedIngredients"][i]+String.raw')';
        // }
        // query = {
        //   Cuisine: "Mexican",
        // };
        // query["Cleaned-Ingredients"] =  $regex":str;
        //   else if ("Cuisine" in filters) {
        //   query = { "Cuisine": { $eq: filters["Cuisine"] } }
        // }
      }
    }

    let cursor;

    try {
      cursor = await recipes
        .find(query)
        .collation({ locale: "en", strength: 2 });
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { recipesList: [], totalNumRecipess: 0 };
    }

    const displayCursor = cursor.limit(recipesPerPage);
    try {
      const recipesList = await displayCursor.toArray();
      const totalNumRecipes = await recipes.countDocuments(query);

      return { recipesList, totalNumRecipes };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { recipesList: [], totalNumRecipes: 0 };
    }
  }

  //Function to get the list of Cuisines
  static async getCuisines() {
    let cuisines = [];
    try {
      cuisines = await recipes.distinct("Cuisine");
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }

  // code
}
