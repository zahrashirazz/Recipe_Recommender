import React, { useState, useContext } from "react";
import recipeDB from "../apis/recipeDB";
import { Redirect, withRouter } from "react-router";
import "./login.css";
import Header from "./Header";
// import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function loginForm(props) {
  if (sessionStorage.getItem("login_recipe_recommender")) {
    props.history.push("/home");
  }

  const [state, setState] = useState({
    username: "",
    password: "",
    successMessage: null,
    failMessage: null,
  });

  const changeValue = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    const stateTemp = {
      username: state.username,
      password: state.password,
    };
    const response = await recipeDB
      .post("/users/authorizeUser", stateTemp)
      .catch((err) => {
        console.log(err, err.message);
      });
    if (response) {
      setState((prevState) => ({
        ...prevState,
        successMessage: "Login successful. Redirecting to home page..",
        failMessage: null,
      }));
      sessionStorage.setItem(
        "login_recipe_recommender",
        response.data["username"]
      );
      props.setLoginFlag;
      props.history.push("/home");
    } else {
      setState((prevState) => ({
        ...prevState,
        failMessage: "Login unsuccessful. Please try again.",
        successMessage: null,
      }));
    }
  };

  return (
    <div>
      <Header loginFlag={false} />
      <section class="h-100 gradient-form container" >
      <div className="row d-flex justify-content-center align-items-center h-100 gradient-custom-2">
      
    {/* lhs */}
      <div className='col-lg-6 d-flex align-items-center'>
        <form className='form-control row'>
          
          <div className='form-outline mb-4 col-md-12'>
          <label class="form-label">Username</label><br></br>
            <input type="text"  id="username" className='form-control'value={state.username} onChange={changeValue}/>
          </div>

          <div className='form-outline mb-4 col-md-12'>
          <label class="form-label">Password</label><br></br>
            <input type="password" id="password"className='form-control' value={state.password} onChange={changeValue}/>
          </div>

          <div class="text-center pt-1 mb-5 pb-1 col-md-12">
            <button
              className="btn btn-primary gradient-custom-2"
              type="button" onClick={submitLogin}>Submit</button>
          </div>
          <br />
          {state.successMessage ? (
            <div style={{ color: "green" }}>{state.successMessage}</div>
          ) : null}
          {state.failMessage ? (
            <div style={{ color: "red" }}>{state.failMessage}</div>
          ) : null}
        </form>
      </div>
    

      {/* rhs
      <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
        <div class="text-white px-3 py-4 p-md-5 mx-md-4">
          <h4 class="mb-4">Hello !</h4>
          <image src='componentImages/chef.png'></image>
        </div>
      </div> */}
    </div>

    </section></div>
  );
}
export default withRouter(loginForm);
