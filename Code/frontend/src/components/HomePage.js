import React, { useState } from "react";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import{ Link } from "react-router-dom";

function HomePage() {

  return (
<div className="row mt-5 container" style={{marginLeft:'10%'}}>
    <div className='col-md-3'>
    <Link to="/home" style={{textDecoration: 'none',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <button
        className="btn btn-primary gradient-custom-2 p-3"
        type="button" >Search Recipe</button>
    </Link>
    </div>

    <div className='col-md-6'>
        <img style={{width:'100%', height:"100%", overflow:"hidden", margin:'0'}}src='https://static.vecteezy.com/system/resources/previews/007/696/455/non_2x/grilling-sausage-with-the-chef-free-vector.jpg'></img>
    </div>

    <div className='col-md-3'>
    <Link to="/addRecipe" style={{textDecoration: 'none',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <button
        className="btn btn-primary gradient-custom-2 p-3"
        type="button" >Add Recipe</button>
    </Link>
    </div>
</div>
  );
}
export default HomePage;
