import "../video.css";
import React, { useState } from 'react';
import VideoURL from "./VideoURL";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import{ Link } from "react-router-dom";

import background from "./componentImages/bg-card2.jpg";


// Recipe component dealing with individial recipe items
const Recipe = (recipe) => {
  let loginUser = sessionStorage.getItem("login_recipe_recommender");
  // splitting the ingredients with seperator as a comma
  var ingredients_seperated = recipe.recipe["Cleaned-Ingredients"].split(",");
  var diet_type = "vegetarian";
  for (var i = 0; i < ingredients_seperated.length; i++) {
    if (ingredients_seperated[i].includes("chicken")) {
      diet_type = "Non-vegetarian";
    } else if (ingredients_seperated[i].includes("fish")) {
      diet_type = "Non-vegetarian";
    } else if (ingredients_seperated[i].includes("lobster")) {
      diet_type = "Non-vegetarian";
    } else if (ingredients_seperated[i].includes("beef")) {
      diet_type = "Non-vegetarian";
    }
  }

  var translated_instruction = recipe.recipe["TranslatedInstructions"];
  var time_to_cook = recipe.recipe["TotalTimeInMins"];
  var calories = recipe.recipe["calories"];
  console.log("time_to_cook", time_to_cook);
  // mapping each ingredient to be displayes as a list item
  ingredients_seperated = ingredients_seperated.map((ingredient) => (
    <li style={{textTransform:'capitalize',color: '#b44593',fontWeight:'250',listStyleType:'none'}} > {ingredient}</li>
  ));
  <p style={{color: '#b44593',fontWeight:'250'}}>{translated_instruction}</p>;

  function saveRecipe() {
    console.log(recipe);
  }

  const [isExpanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };



  // returns individual container for each recipe

  return (
    <div className=" container p-5 gradient-custom-2 mt-5">
   
    <div className="row containerA" style={{background:'white' , borderRadius:'8px'}}  >
          <div className="row col-md-6 ">
            <div className='col-md-6'>
              <img className='p-2'style={{width:'100%', height:'100%'}} src={recipe.recipe["image-url"]} alt={recipe.recipe.TranslatedRecipeName}/>
            </div>

            <div className='col-md-6 pt-3'>
              <h2 style={{textTransform:'capitalize',color: '#b44593',fontWeight:'400'}}>{recipe.recipe.TranslatedRecipeName}</h2>
              <h4 style={{marginBottom:'5px',fontSize:'1rem',fontWeight:'300'}}>Time to cook: 
                <span style={{marginBottom:'5px',fontSize:'1rem',fontWeight:'200'}}> {time_to_cook} minutes</span></h4>
            

            <div class="pt-3 pb-1 col-md-12">
            <button
              className="btn btn-primary gradient-custom-2"
              type="button" onClick={toggleExpansion}>{isExpanded ? 'Close' : 'See Instructions'}</button>
            </div>
            </div>
            {/* <Link path='/recipeExpand'>Go to Recipe</Link> */}
          </div>

          < div className="col-md-6 expText">
            {isExpanded && (
              <div className=" pt-3">
                <h4 style={{textTransform:'capitalize',color: '#b44593'}}>Diet Type - 
                <span style={{marginBottom:'5px'}}>{diet_type}</span></h4>
                <p className="card.text">
                  <h4 style={{textTransform:'capitalize',color: '#b44593'}}>Ingredients - </h4>
                  <ul style={{listStyleType:'none'}}> <li>{ingredients_seperated}</li> </ul>
                  <h4 style={{textTransform:'capitalize',color: '#b44593'}}>Calories - 
                  <span style={{marginBottom:'5px'}}>{calories}</span></h4>
                  <h4 style={{textTransform:'capitalize',color: '#b44593'}}>Instructions: </h4>
                  <span style={{marginBottom:'5px'}}><ol classname="" > {translated_instruction} </ol></span>
                </p></div>
            )}
          </div>

         
            
        </div></div>

  );
};





export default Recipe;