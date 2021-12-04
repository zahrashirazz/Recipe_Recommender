import mongodb from "mongodb";
import nodemailer from "nodemailer";
import password from "./mail_param.js";
const pass = password.password;
// import 'requests' from requests;
import axios from "axios";

import request from 'request';

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
    // let str
    if (filters) {
      if ("CleanedIngredients" in filters) {
        var str = "(?i)";
        var new_str=""
        for (var i = 0; i < filters["CleanedIngredients"].length; i++) {
          const str1 = filters["CleanedIngredients"][i];
          str += "(?=.*" + str1 + ")";
          // new_str+=
        }
        // console.log(str);
        query = { "Cleaned-Ingredients": { $regex: str } };
        query["Cuisine"] = filters["Cuisine"];

        var email = filters["Email"];
        var flagger = filters["Flag"];
        // console.log(email);
        // console.log(flagger);

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
        // console.log(str_mail);
        var new_str=recipesList[j - 1]["Cleaned-Ingredients"].replace(/,/g," and ")
        console.log(new_str)
       
        var total_cal=0
        await axios.get('https://api.calorieninjas.com/v1/nutrition?query='+new_str,{
          headers: {
              "X-Api-Key": "XSCESI7dxnCa7WydS0dZdQ==2nqZmMFF8hXOwdkE"
          }
        })
        .then(function (response) {
          // handle success
          // console.log(typeof response.data.items[0].calories)
          // for (var property in response.data.items) {
            // console.log(`${property}: ${response['data']['items']['calories']}`);
          // }

          for(let i=0; i<response.data.items.length;i++){
            var temp=response.data.items[i].calories
            console.log(temp)
            total_cal+=temp
          }
          // // console.log(response.data.items[0]['calories'])
          console.log("Total Calories ------- "+total_cal)

          // console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log("error");
        })
        .then(function () {
          // always executed
        });

        // console.log(total_cal)
        // 6c6cd52f12d5f99f0bf67d14e8c3547d

      
        // function(error, response, body) {
        //   if(error) return console.error('Request failed:', error);
        //   else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        //   else console.log(body);
        // });

        // for (var cal in items) {
        //    total_cal+=cal[calories];
        // }
        
        recipesList[j-1]["calories"]=total_cal;
        // console.log(recipesList[j-1])
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
