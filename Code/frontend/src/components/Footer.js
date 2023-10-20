import React, { useState } from "react";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import{ Link } from "react-router-dom";

function Footer() {

  return (
<footer className=" d-flex flex-column align-items-center p-2 navbar-ul gradient-custom-2 mt-5" style={{position:'relative',marginBottom:'0'}}>

      <p style={{color:'white', fontWeight:'300'}}>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
export default Footer;
