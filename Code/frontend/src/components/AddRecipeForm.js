import React, { Component } from "react";

// Form component to maintain input form
class Form extends Component {
  // constructor for Form Component
  // We maintain user input as a state object
  constructor() {
    super();

    this.state = {
      // cuisine : "Any",
      //numberIngredients : 0,
      ingredients: new Set(),
      cuisineState: 0,
      cuisine: "",
    };
  }
  // function to send the data to the parent App component
  // uses the function that is sent through props from the App Component
  handleRecipeSubmit = (event) => {
    event.preventDefault();
    var dict = {};
    dict["recipe_name"] = document.getElementById("recipe_name").value;
    dict["recipe_cuisine"] = document.getElementById("recipe_cuisine").value;
    dict["recipe_ingredients"] =
      document.getElementById("recipe_ingredients").value;
    dict["recipe_instructions"] = document.getElementById(
      "recipe_instructions"
    ).value;
    dict["recipe_time"] = document.getElementById("recipe_time").value;
    dict["recipe_url"] = document.getElementById("recipe_url").value;
    this.props.sendRecipeFormData(dict);
  };

  // render function dispays the UI content i.e the form content
  render() {
    {
    }

    // returns jsx element
    return (
      <div class="formOutercontainer">
        <form onSubmit={this.handleRecipeSubmit}>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Recipe Name: </label> <br />
              <div className="input-group-append">
                <input type="text" id="recipe_name" />
              </div>
            </div>
          </div>

          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Recipe Ingredients: </label> <br />
              <div className="input-group-append">
                <input type="textarea" id="recipe_ingredients" />
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Recipe Instructions: </label> <br />
              <div className="input-group-append">
                <input type="text" id="recipe_instructions" />
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Recipe Cuisine: </label> <br />
              <div className="input-group-append">
                <input type="text" id="recipe_cuisine" />
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Recipe Time Taken: </label> <br />
              <div className="input-group-append">
                <input type="text" id="recipe_time" />
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <label class="sideLabel"> Recipe Image URL: </label> <br />
              <div className="input-group-append">
                <input type="text" id="recipe_url" />
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="input-group col-lg-4 bg-danger text-white">
              <div className="input-group-append">
                <div className="row pb-1">
                  <div className="input-group col-lg-4">
                    <button
                      type="button"
                      id="submit"
                      onClick={this.handleRecipeSubmit}
                    >
                      <h4> Submit Recipe </h4>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
