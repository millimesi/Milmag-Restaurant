import React, { useRef } from "react";
// import logo from "../assets/logo.png";
import "./HomeSections.css";
// import "./style.css";
import Burger from "../assets/burger.png";
import Pizza from "../assets/Pizza.png";
import Salad from "../assets/salad.png";
import Drink from "../assets/drink.png";

const HomeSection = () => {
  const slideRef = useRef(null); // Reference to the slide container

  const handleNext = () => {
    const items = slideRef.current.querySelectorAll(".item");
    if (items.length > 0) {
      // Move the first item to the end of the slide
      slideRef.current.appendChild(items[0]);
    }
  };

  const handlePrev = () => {
    const items = slideRef.current.querySelectorAll(".item");
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      slideRef.current.prepend(lastItem);
    }
  };
  return (
    <div className="container">
      <div className="slide" ref={slideRef}>
        <div className="item" style={{ backgroundImage: `url(${Burger})` }}>
          <div className="content">
            <div className="name">Burger</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <button>Order Now</button>
          </div>
        </div>
        {/*-----------------------------------  */}
        <div className="item" style={{ backgroundImage: `url(${Pizza})` }}>
          <div className="content">
            <div className="name">Pizza</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <button>Order Now</button>
          </div>
        </div>
        {/*-----------------------------------  */}
        <div className="item" style={{ backgroundImage: `url(${Salad})` }}>
          <div className="content">
            <div className="name">Salad</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <button>Order Now</button>
          </div>
        </div>
        {/*-----------------------------------  */}
        <div className="item" style={{ backgroundImage: `url(${Drink})` }}>
          <div className="content">
            <div className="name">Drinks</div>
            <div className="des">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!
            </div>
            <button>Order Now</button>
          </div>
        </div>
        {/*-----------------------------------  */}
      </div>
      <div className="button">
        <button className="prev" onClick={handlePrev}>
          Prev
        </button>
        <button className="next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomeSection;
