import React, { useRef, useEffect } from "react";
// import logo from "../assets/logo.png";
import "./HomeSections.css";
// import "./style.css";
import Burger from "../assets/burger.png";
import Pizza from "../assets/pizza.png";
import Salad from "../assets/salad.png";
import Drink from "../assets/drinks.png";
import { NavLink } from "react-router-dom";

const HomeSection = () => {
  const slideRef = useRef(null); // Reference to the slide container

  const handleNext = () => {
    const items = slideRef.current.querySelectorAll(".item");
    if (items.length > 0) {
      // Move the first item to the end of the slide
      slideRef.current.appendChild(items[0]);
    }
  };

  useEffect(() => {
    // Set up the interval for auto-sliding
    const interval = setInterval(handleNext, 6000); // Slide every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="home-container">
      <div className="slide" ref={slideRef}>
        <div className="item" style={{ backgroundImage: `url(${Burger})` }}>
          <div className="content">
            <div className="name">Burger</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <button>
              <NavLink className="ordernow" to="/food">
                Order Now
              </NavLink>
            </button>
          </div>
        </div>
        {/*-----------------------------------  */}
        <div className="item" style={{ backgroundImage: `url(${Pizza})` }}>
          <div className="content">
            <div className="name">Pizza</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <button>
              <NavLink className="ordernow" to="/food">
                Order Now
              </NavLink>
            </button>
          </div>
        </div>
        {/*-----------------------------------  */}
        <div className="item" style={{ backgroundImage: `url(${Salad})` }}>
          <div className="content">
            <div className="name">Salad</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <button>
              <NavLink className="ordernow" to="/food">
                Order Now
              </NavLink>
            </button>
          </div>
        </div>
        {/*-----------------------------------  */}
        <div className="item" style={{ backgroundImage: `url(${Drink})` }}>
          <div className="content">
            <div className="name">Drinks</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <button>
              <NavLink className="ordernow" to="/food">
                Order Now
              </NavLink>
            </button>
          </div>
        </div>
        {/*-----------------------------------  */}
      </div>
      {/* <div className="button">
        <button className="prev">Prev</button>
        <button className="next">Next</button>
      </div> */}
    </div>
  );
};

export default HomeSection;
