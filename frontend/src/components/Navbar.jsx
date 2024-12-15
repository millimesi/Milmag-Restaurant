import React, { useContext } from "react"; // , {useContext}
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../stylesheets/customNavBar.css";
import { FaCartShopping } from "react-icons/fa6";
import { cartContext } from "../context/context.jsx";
import Logo from "../assets/logo.png";
// import Logoo from "./Logoo.jsx";
// import axios from "axios";

const NavBar = () => {
  const { state } = useContext(cartContext); // Access cart items from context
  const navigate = useNavigate();
  const location = useLocation();

  // Calculate total quantity in the cart
  const totalItemQuantity = state.length;

  const navBarLink = ({ isActive }) =>
    isActive ? "navbarlinkActive px-3 py-2" : "navbarlink px-3 py-2";

  const isAuthenticated = !!localStorage.getItem("token");

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      navigate("/login", { state: { redirectTo: "/cart" } });
    }
  };

  const handleReservationClick = () => {
    if (isAuthenticated) {
      navigate("/reservation");
    } else {
      console.log("Navigating to login with redirectTo: /reservation"); // Add this line
      navigate("/login", { state: { redirectTo: "/reservation" } });
    }
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    // Redirect user to the home page
    navigate("/");
  };

  // Conditionally set the background color based on the route
  const isHomePage = location.pathname === "/";

  // const handleLoginRegisterNavBar = async(e) => {
  //   try {
  //     const response = await axios.get("/api/v1/users/login");

  //   }
  // }

  return (
    <div className="">
      <p
        className="Logoo"
        style={{
          position: isHomePage ? "fixed" : "",
        }}
      >
        <img src={Logo} alt="Milmag Logo" />
        <NavLink className={navBarLink} to="/">
          <strong>MILMAG</strong>
        </NavLink>
      </p>
      <div
        className="d-flex justify-content-end px-5 pt-3 pb-3 navbar-container"
        style={{
          position: isHomePage ? "fixed" : "",
        }}
      >
        {/* <NavLink className={navBarLink} to="/">
          HOME
        </NavLink> */}
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
        <NavLink className={navBarLink} onClick={handleReservationClick}>
          RESERVATIONS
        </NavLink>

        {/* Conditionally render Login and Register based on authentication status */}
        {!isAuthenticated && (
          <>
            <NavLink className={navBarLink} to="/register">
              REGISTER
            </NavLink>
            <NavLink className={navBarLink} to="/login">
              LOGIN
            </NavLink>
            {/* <NavLink className={navBarLink} onClick={handleLogout}>
              LOGOUT
            </NavLink> */}
          </>
        )}

        {/* Conditionally render Logout based on authentication status */}
        {isAuthenticated && (
          <>
            <NavLink className={navBarLink} onClick={handleLogout}>
              {" "}
              {/*This logout link was added for testing purposes. It will be removed */}
              LOGOUT
            </NavLink>
          </>
        )}

        <NavLink className="shoppingCartContainer" onClick={handleCartClick}>
          <FaCartShopping className="shoppingCarts" />
          {totalItemQuantity > 0 && (
            <span className="cart-count">{totalItemQuantity}</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
