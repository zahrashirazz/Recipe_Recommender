import React, {useState, useContext} from 'react';
import recipeDB from "../apis/recipeDB";
import { withRouter } from "react-router";
import './login.css'
// import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function loginForm(){
    const [state, setState]= useState({
        username : "",
        password: "",
        loginMessage: null
    })
    
    const changeValue = (event) => {
        const {id , value} = event.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const submitLogin = async (event) => {
        event.preventDefault();
        const stateTemp = {
            "username": state.username,
            "password": state.password
        }
        const response = await recipeDB.post("/users/authorizeUser", stateTemp).catch(err => {
            console.log(err, err.message)
        });
        if(response){
            setState(prevState => ({
                ...prevState,
                'loginMessage' : 'Login successful. Redirecting to home page..'
            }));
            localStorage.setItem("login",response.data['_id']);
        }
    }

    return(
        <div id="parent">
            <form id="form_login">
                <div>
                <label>Username</label>
                <input type="text" id="username" value={state.username} onChange={changeValue}/>
                </div>
                <div>
                <label>Password</label>
                <input type="password" id="password" value={state.password} onChange={changeValue}/>
                </div>
                <br/>
                <button className="login-btn" type="button" id="submit-btn" onClick={submitLogin}>Submit</button>
            </form>
        </div>
    )
}
export default withRouter(loginForm);