import mongodb from "mongodb";
import nodemailer from "nodemailer";
import password from "./mail_param.js";
const pass = password.password;

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
        var str = "(?i)";

        for (var i = 0; i < filters["CleanedIngredients"].length; i++) {
          const str1 = filters["CleanedIngredients"][i];
          str += "(?=.*" + str1 + ")";
        }
        console.log(str);
        query = { "Cleaned-Ingredients": { $regex: str } };
        query["Cuisine"] = filters["Cuisine"];
        // <<<<<<< HEAD
        var email = filters["Email"];
        var flagger = filters["Flag"];
        console.log(email);
        console.log(flagger);

        // =======
        // >>>>>>> 4bd7a622fe3843494d0ec22de41808bd7d51e301
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

      var str_mail = "";
      for (var j = 1; j <= recipesList.length; j++) {
        str_mail += "\nRecipe " + j + ": \n";
        str_mail += recipesList[j - 1]["TranslatedRecipeName"] + "\n";
      }

      if (flagger == "true") {
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "srijas.alerts@gmail.com",
            pass: pass,
          },
        });

        var mailOptions = {
          from: "srijas.alerts@gmail.com",
          to: email,
          subject: "Your Recommended Recipes!",
          text: str_mail,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }

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
