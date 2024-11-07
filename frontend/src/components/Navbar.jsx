import React from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/customNavBar.css";
import Logo from "../assets/logo.png";

const NavBar = () => {
  const navBarLink = ({ isActive }) =>
    isActive ? "navbarlinkActive px-3 py-2" : "navbarlink px-3 py-2";

  return (
    <div className="navBarr">
      <p className="Logoo">
        <img src={Logo} alt="Milmag Logo" />
        Milmag
      </p>
      <div className="d-flex justify-content-end px-5 pt-3 pb-3 navbar-container">
        <NavLink className={navBarLink} to="/">
          HOME
        </NavLink>
        <NavLink className={navBarLink} to="/food">
          MENU
        </NavLink>
        {/* <a href="#restaurant-section" className="navbarlink px-3 py-2">
          OUR RESTAURANT
        </a>
        <a href="#testimonial-section" className="navbarlink px-3 py-2">
          TESTIMONIAL
        </a>
        <a href="#contact-section" className="navbarlink px-3 py-2">
          CONTACT US
        </a> */}
        <NavLink className={navBarLink} to="#">
          RESERVATIONS
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
