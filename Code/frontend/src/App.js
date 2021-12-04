import "./App.css";
import Form from "./components/Form.js";
import AddRecipeForm from './components/AddRecipeForm.js';
import Header from "./components/Header";
import recipeDB from "./apis/recipeDB";
import RecipeList from "./components/RecipeList";
import React, { Component } from "react";

// Main component of the project
class App extends Component {
  // constructor for the App Component
  constructor() {
    super();

    this.state = {
      cuisine: "",
      //NoIngredients : 0,
      ingredients: new Set(),
      recipeList: [],
      email: "",
      flag: false,
    };
  }
  // Function to get the user input from the Form component on Submit action

  
  handleRecipeSubmit = async (formDict) => {

    const addRecipeDetails= {
      "Cleaned-Ingredients":formDict["recipe_ingredients"],
      "Cuisine":formDict["recipe_cuisine"],
      "TranslatedRecipeName":formDict["recipe_name"],
      "TranslatedInstructions":formDict["recipe_instructions"]
    }
    this.postRecipeDetails(addRecipeDetails);
  };

  postRecipeDetails = async (addRecipeDetails) => {
    try {
      console.log("inside app.js",addRecipeDetails)
      const response = await recipeDB.post("recipes/Addrecipes", addRecipeDetails);
      // this.setState({
      //   recipeList: response.data.recipes,
      // });
    } catch (err) {
      console.log(err);
    }
  };
  // Function to get the user input from the Form component on Submit action
  handleSubmit = async (formDict) => {
    this.setState({
      // cuisine: cuisineInput,
      //NoIngredients: noIngredientsInput,
      ingredients: formDict["ingredient"],
      cuisine: formDict["cuisine"],
      email: formDict["email_id"],
      flag: formDict["flag"],
    });

    const mail = formDict["email_id"];
    const flag = formDict["flag"];
    const items = Array.from(formDict["ingredient"]);
    const cuis = formDict["cuisine"];
    this.getRecipeDetails(items, cuis, mail, flag);
    //  alert(typeof(ingredientsInput["cuisine"]));
  };

  getRecipeDetails = async (ingredient, cuis, mail, flag) => {
    try {
      const response = await recipeDB.get("/recipes", {
        params: {
          CleanedIngredients: ingredient,
          Cuisine: cuis,
          Email: mail,
          Flag: flag,
        },
      });
      this.setState({
        recipeList: response.data.recipes,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <Header />

        {/* handleSubmit function is being sent as a prop to the form component*/}
        <AddRecipeForm sendRecipeFormData = {this.handleRecipeSubmit}/>

        <Form sendFormData={this.handleSubmit} />

        {/* RecipeList is the component where results are displayed.
        App's recipeList state item is being sent as a prop
        */}

        <RecipeList recipes={this.state.recipeList} />
      </div>
    );
  }
}

export default App;
