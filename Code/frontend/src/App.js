import "./App.css";
import Form from "./components/Form.js";
import AddRecipeForm from "./components/AddRecipeForm.js";
import Header from "./components/Header";
import recipeDB from "./apis/recipeDB";
import RecipeList from "./components/RecipeList";
import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Switch,
} from "react-router-dom";
import login from "./components/login";
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
      loginFlag: sessionStorage.getItem("login_recipe_recommender")
        ? true
        : false,
      loginId: sessionStorage.getItem("login_recipe_recommender"),
      cooking_time: "",
    };
    this.setLoginFlag.bind(this);
  }
  // Function to get the user input from the Form component on Submit action

  handleRecipeSubmit = async (formDict) => {
    const addRecipeDetails = {
      "Cleaned-Ingredients": formDict["recipe_ingredients"],
      Cuisine: formDict["recipe_cuisine"],
      TranslatedRecipeName: formDict["recipe_name"],
      TranslatedInstructions: formDict["recipe_instructions"],
      TotalTimeInMins: Number(formDict["recipe_time"]),
      "image-url": formDict["recipe_url"],
    };
    this.postRecipeDetails(addRecipeDetails);
  };

  postRecipeDetails = async (addRecipeDetails) => {
    try {
      console.log("inside app.js", addRecipeDetails);
      const response = await recipeDB.post(
        "recipes/Addrecipes",
        addRecipeDetails
      );
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
      cooking_time: formDict["time_to_cook"],
    });

    const mail = formDict["email_id"];
    const flag = formDict["flag"];
    const items = Array.from(formDict["ingredient"]);
    const cuis = formDict["cuisine"];
    const cook_time = formDict["time_to_cook"];
    this.getRecipeDetails(items, cuis, mail, flag, cook_time);
    //  alert(typeof(ingredientsInput["cuisine"]));
  };

  getRecipeDetails = async (ingredient, cuis, mail, flag, cook_time) => {
    try {
      const response = await recipeDB.get("/recipes", {
        params: {
          CleanedIngredients: ingredient,
          Cuisine: cuis,
          Email: mail,
          Flag: flag,
          totalTime: cook_time,
        },
      });
      this.setState({
        recipeList: response.data.recipes,
      });
    } catch (err) {
      console.log(err);
    }
  };

  setLoginFlag() {
    console.log("set login flag");
    this.setState({
      loginFlag: sessionStorage.getItem("login_recipe_recommender")
        ? true
        : false,
      loginId: sessionStorage.getItem("login_recipe_recommender"),
      recipeList: [],
    });
  }

  render() {
    return (
      <Router>
        {/* handleSubmit function is being sent as a prop to the form component*/}

        <Switch>
          <Route
            exact
            path="/login"
            component={login}
            setLoginFlag={this.setLoginFlag}
          />

          <Route path="/home">
            <Header loginFlag={this.state.loginFlag} />
            <Form sendFormData={this.handleSubmit} />
            <AddRecipeForm sendRecipeFormData={this.handleRecipeSubmit} />

            {/* RecipeList is the component where results are displayed.
                  App's recipeList state item is being sent as a prop
                  */}

            <RecipeList recipes={this.state.recipeList} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
