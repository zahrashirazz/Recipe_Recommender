import React, { Component } from "react";
import "./login.css";

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

  // function to change cuisine state, triggered on selection of a cuisine item.
  /*cuisineUpdate = (event) => {

        this.setState (
            {
                cuisine : event.target.value,
                numberIngredients : this.state.numberIngredients,
                ingredients : this.state.ingredients
            }, () => console.log( this.state )
        )
    }
    */
  // function to update the maximum number of ingredients in the state.
  /*numberUpdate = (event) =>
    {
        this.setState (
            {
                cuisine : this.state.cuisine,
                numberIngredients: event.target.value,
                ingredients:this.state.ingredients
            }, () => console.log( this.state )
        )
    }*/

  // function to display the ingredients added by the user upto that point.
  printHander = () => {
    // converting the set into an array, to make it iterable
    const items = [...this.state.ingredients];

    // mapping each item to be displayed as a list item
    const list_items = items.map((item) => (
      <li onMouseDown={this.removeHandler} id={item} class="list-item">
        {" "}
        {item}
      </li>
    ));

    return <ul class="custom-list">{list_items}</ul>;
  };

  // fucntion to add ingredients to the inredients (set datastructure) in App's state
  // triggered by clicking add item button
  addHandler = (event) => {
    const ingredient = document.getElementById("ingredient").value;

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,
        ingredients: new Set(this.state.ingredients).add(ingredient),
      },
      () => console.log(this.state)
    );

    document.getElementById("ingredient").value = "";
  };

  // fucntion to add ingredients to the inredients (set datastructure) in App's state
  // triggered by clicking item that is displayed ysing printHandler function
  removeHandler = (event) => {
    var discardIngredient = event.target.id;
    var ingredientList = this.state.ingredients;

    ingredientList.delete(discardIngredient);

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,
        ingredients: ingredientList,
      },
      () => console.log(this.state)
    );
  };

  // function to send the data to the parent App component
  // uses the function that is sent through props from the App Component
  handleSubmit = (event) => {
    // this.setState(
    //   {
    //     //cuisine : this.state.cuisine,
    //     //numberIngredients : this.state.numberIngredients,
    //
    //     ingredients: new Set(this.state.ingredients).add(
    //       document.getElementById("cuisine").value
    //     ),
    //   },
    //   () => console.log(this.state)
    // );

    this.setState(
      {
        //cuisine : this.state.cuisine,
        //numberIngredients : this.state.numberIngredients,

        cuisine: document.getElementById("cuisine").value,
      },
      () => console.log(this.state)
    );

    event.preventDefault();
    var dict = {};
    dict["ingredient"] = this.state.ingredients;
    dict["cuisine"] = document.getElementById("cuisine").value;
    dict["email_id"] = document.getElementById("email_id").value;
    dict["flag"] = document.getElementById("Send_email").checked;
    dict["time_to_cook"] = document.getElementById("time_to_cook").value;
    console.log("dict value", dict["time_to_cook"]);
    //this.props.sendFormData(this.state.cuisine, this.state.numberIngredients,this.state.ingredients)
    this.props.sendFormData(dict);
    document.getElementById("cuisine").value = "";
    document.getElementById("email_id").value = "";
    document.getElementById("time_to_cook").value = "";
  };

  // render function dispays the UI content i.e the form content
  render() {
    {
      /* const cuisine_list = [ "Any", "Mexican", "Swedish", "Latvian", "Italian",
        "Spanish", "American","Scottish","British","Thai","Japanese","Chinese",
        "Indian","Canadian","Russian","Jewish","Polish","German","French","Hawaiian",
        "Brazilian", "Peruvian","Cuban","Tibetian","Salvadorian","Egyptian","Greek",
        "Belgian","Irish","Welsh","Mormon","Cajun","Portugese","Turkish","Haitian",
    "Tahitian","Kenyan","Korean","Algerian","Nigerian","Libyan" ]*/
    }

    // returns jsx element
    return (
      <div class="container p-5 gradient-custom-2 border">
        <form onSubmit={this.handleSubmit}>
          
          <div class='row'>
            <div className="col-sm-12 align-items-center  mb-4">
              <label class="form-label" style={{ color: 'white', fontWeight: 'bold' }}>Add Ingredient</label>
                <div class='row'><input type="text" id="ingredient" class='col-md-6'/>
                <button onClick={this.addHandler} type="button" class='col-md-6' id="addButton" 
                style={{color: 'white',fontWeight: 'bold',border:'1px solid white'}}>
                  {" "}Add item{" "}
                </button>
                </div>
            </div>

            <div className="col-md-6 mb-4">
              <label class="form-label" style={{ color: 'white', fontWeight: 'bold' }}>Cuisine</label>
                <input type="text" id="cuisine" />
            </div>

            <div className="col-md-6 align-items-center  mb-4">
              <label class="form-label" style={{ color: 'white', fontWeight: 'bold' }}>Time to cook</label><br></br>
              <select class="form-select" name="time_to_cook" id="time_to_cook" style={{padding : '12px 20px',borderRadius: '4px'}}>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
              </select>
            </div>
          </div>

<div>
            <div className="col-lg-12 d-flex flex-column align-items-center row">
                <div class='col-md-6'>
                <label class="form-labelr" style={{ color: 'white', fontWeight: 'bold' }}>Enter Email</label></div>
                <input type="text" id="email_id" />
                <div class='col-md-6 pt-3'>
                
                <label class="form-label d-flex flex-column align-items-center" style={{ color: 'white', fontWeight: 'bold' }}><input type="checkbox" id="Send_email" name="email" /> Send me email</label></div>
                
            </div>

            <div className="col-lg-12 d-flex flex-column align-items-center mt-2">
                <label class="d-flex flex-column align-items-center" style={{ color: 'white', fontWeight: 'bold' }}>Added Ingredients</label>
                {this.printHander()}
            </div>
                {/*
                     <div className="row pb-1">
                    <div className="input-group col-lg-4">
                        <label class='sideLabel'>Maximum Number of Ingredients: </label><br/>
                        <div className="input-group-append">
                        <input type = "number" id = "NoIngredient" onChange = {this.numberUpdate} />
                        </div>
                    </div>
                    </div>

                    <div className="row pb-1">
                    <div className="input-group col-lg-4">
                        <label class='sideLabel'> Cusine Selection: </label><br/><br/>
                        <select value={this.state.cuisine} onChange={this.cuisineUpdate} >
                            {
                                cuisine_list.map( (category, i) => <option key = {i}> {category} </option> )
                            }
                        </select>
                    </div>
                        </div>*/}

                <div className="col-lg-12 d-flex flex-column align-items-center pb-10">
                    <button
                      type="button"
                      id="submit"
                      className='btn'
                      onClick={this.handleSubmit}
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        border:'1px solid white'
                      }}
                    >
                     Search Recipe 
                    </button>
              </div>


                          
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
