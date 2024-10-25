import React from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/customNavBar.css";

const NavBar = () => {
  const navBarLink = ({ isActive }) =>
    isActive ? "navbarlinkActive px-3 py-2" : "navbarlink px-3 py-2";

  return (
    <div className="navBarr">
      <div className="d-flex justify-content-end px-5 pt-3 pb-3 navbar-container">
        <NavLink className={navBarLink} to="/">
          HOME
        </NavLink>
        <NavLink className={navBarLink} to="/food">
          MENU
        </NavLink>
        <NavLink className={navBarLink} to="#">
          RESERVATIONS
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
