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
      <div class=" container gradient-custom-2 mb-5 mt-5">
        <form class='row p-5' onSubmit={this.handleRecipeSubmit}>

        <div className="col-lg-6 d-flex flex-column align-items-center">
          <label style={{ color: 'white', fontWeight: 'bold', display: 'block' }}>Recipe Name</label>
          <input type="text" id="recipe_name" />
        </div>

            <div className="col-lg-6 d-flex flex-column align-items-center  mb-4">
              <label class="" style={{ color: 'white', fontWeight: 'bold' , display: 'block' }}> Recipe Ingredients</label> 
                <input type="textarea" id="recipe_ingredients" />
            </div><br></br>

            <div className="col-lg-6 d-flex flex-column align-items-center  mb-4">
              <label class=""style={{ color: 'white', fontWeight: 'bold' , display: 'block' }}> Recipe Instructions</label> 
                <input type="text" id="recipe_instructions" />
            </div>


            <div className="col-lg-6 d-flex flex-column align-items-center mb-4">
              <label class=""style={{ color: 'white', fontWeight: 'bold', display: 'block'  }}> Recipe Cuisine</label> 
                <input type="text" id="recipe_cuisine" />
            </div><br></br>

            <div className="col-lg-6 d-flex flex-column align-items-center  mb-4">
              <label class=""style={{ color: 'white', fontWeight: 'bold', display: 'block'  }}> Recipe Time Taken</label> 
                <input type="text" id="recipe_time" />
            </div>

            <div className="col-lg-6 d-flex flex-column align-items-center mb-4">
              <label class=""style={{ color: 'white', fontWeight: 'bold', display: 'block'  }}> Recipe Image URL</label> 
                <input type="text" id="recipe_url" />
            </div><br></br>

            <div className="col-lg-12 d-flex flex-column align-items-center pb-10">
                    <button
                      type="button"
                      id="submit"
                      className='btn'
                      onClick={this.handleRecipeSubmit}
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        border:'1px solid white'
                      }}
                    >
                     Submit Recipe 
                    </button>
              </div>
   
        </form>
      </div>
    );
  }
}

export default Form;
