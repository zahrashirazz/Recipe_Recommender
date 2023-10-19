import React, { useState } from "react";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import{ Link } from "react-router-dom";

function Header(props) {
  const [state, setState] = useState({
    goToLogin: false,
  });

  const clickSignIn = () => {
    setState({ goToLogin: true }, () => {
      console.log(state);
    });
  };

  return (
    <div>
      {state.goToLogin ? (
        <Redirect to="/login" />
      ) : (
        <ul className="navbar-ul gradient-custom-2 mb-5">
          <Link to="/home" style={{textDecoration: 'none'}}><h3 className="navbar-li nav-brand p-3 headerStyles" style={{ fontWeight: 'bold', color: 'white',fontStyle:'italic'}}>
            Recipe Recommender
          </h3></Link>
          <div className="nav-item-right">
          <Link to="/addRecipe" style={{textDecoration: 'none'}}><li className="navbar-li nav-brand p-3" style={{ fontWeight: 'bold', color: 'white'}}>Add Recipe</li></Link>
          </div>
          {/* {props.loginFlag ? (
            <li className="navbar-li navbar-li-right">Saved Recipes</li>
          ) : (
            <li className="navbar-li navbar-li-right">
              <button
                style={{
                  border: "none",
                  height: "100%",
                  width: "6rem",
                  cursor: "pointer",
                }}
                onClick={clickSignIn}
              >
                Sign In
              </button>
            </li>
          )} */}
        </ul>
      )}
    </div>

  );
}
export default Header;
