import React from "react";
import "../video.css";
import VideoURL from "./VideoURL";
import background from "./componentImages/bg-card2.jpg";

// Recipe component dealing with individial recipe items
const Recipe = (recipe) => {
  let loginUser = sessionStorage.getItem("login_recipe_recommender");
  // splitting the ingredients with seperator as a comma
  var ingredients_seperated = recipe.recipe["Cleaned-Ingredients"].split(",");
  var translated_instruction = recipe.recipe["TranslatedInstructions"];
  var time_to_cook = recipe.recipe["TotalTimeInMins"];
  var calories = recipe.recipe["calories"];
  console.log("time_to_cook", time_to_cook);
  // mapping each ingredient to be displayes as a list item
  ingredients_seperated = ingredients_seperated.map((ingredient) => (
    <li class="recipe_ingredient_item"> {ingredient}</li>
  ));
  <p>{translated_instruction}</p>;

  function saveRecipe() {
    console.log(recipe);
  }

  // returns individual container for each recipe

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="col-lg-2 pb-1"
      id="resultContainer"
    >
      <div className="card">
        <div className="card-body">
          <h2>{recipe.recipe.TranslatedRecipeName}</h2>
          <h3>Time to cook: {time_to_cook} minutes</h3>
          <p className="card.text">
            <h3>Ingredients: </h3>
            <br />
            <ul class="result_ingredients"> {ingredients_seperated} </ul>
            <h3>Calories: {calories}</h3>
            <h3>Instructions: </h3>
            <br />
            <ol class="result_instructions"> {translated_instruction} </ol>
            <img
              src={recipe.recipe["image-url"]}
              alt={recipe.recipe.TranslatedRecipeName}
            />
          </p>
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
