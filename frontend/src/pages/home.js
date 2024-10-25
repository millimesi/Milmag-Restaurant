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
    <RestaurantDescription />
    <TestimonialSection />
    <ContactUs />
  </div>
);

export default Home;
