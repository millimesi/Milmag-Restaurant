import React from "react";
// import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import RestaurantDescription from "./RestaurantDescriptionSection.jsx";
import HomeSection from "./HomeSection.jsx";
import TestimonialSection from "./TestimonialSection.jsx";
import ContactUs from "./ContactUs.jsx";

const Home = () => (
  <div>
    <NavBar />
    <HomeSection />
    <div id="restaurant-section">
      <RestaurantDescription />
    </div>
    <div id="testimonial-section">
      <TestimonialSection />
    </div>
    <div id="contact-section">
      <ContactUs />
    </div>
  </div>
);

export default Home;
