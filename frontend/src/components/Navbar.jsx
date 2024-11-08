import React, { useContext } from "react"; // , {useContext}
import { NavLink } from "react-router-dom";
import "../stylesheets/customNavBar.css";
import { FaCartShopping } from "react-icons/fa6";
import { cartContext } from "../context/context.jsx";
import Logo from "../assets/logo.png";

const NavBar = () => {
  const { state } = useContext(cartContext); // Access cart items from context

  // Calculate total quantity in the cart
  const totalItemQuantity = state.length;

  const navBarLink = ({ isActive }) =>
    isActive ? "navbarlinkActive px-3 py-2" : "navbarlink px-3 py-2";

  return (
    <div className="">
      <p className="Logoo">
        <img src={Logo} alt="Milmag Logo" />
        Milmag
      </p>
      <div className="d-flex justify-content-end px-3 pt-3 pb-3 navbar-container">
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
        <NavLink className={navBarLink} to="#">
          LOGIN
        </NavLink>
        <NavLink className='shoppingCarts' to="/cart" >
          <FaCartShopping />
        </NavLink>
        {totalItemQuantity > 0 && <span className="cart-count">{totalItemQuantity}</span>}
      </div>
    </div>
  );
};

export default NavBar;
