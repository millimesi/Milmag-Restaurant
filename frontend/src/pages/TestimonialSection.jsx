import React from "react";
import "./TestimonialSections.css";
import ProfilePic from "../assets/profilePic.png";
import Instagram from "../assets/Ellipse 6.png";
import Facebook from "../assets/Ellipse 7.png";
import Tiwter from "../assets/Ellipse 9.png";

const TestimonialSection = () => {
  return (
    <div className="Testimonial-desc">
      <div className="Testi-header">
        <h1>Testimonials</h1>
        <p>for your comfort, service and freshness</p>
      </div>
      <div className="witness-cont">
        <div className="witness">
          <img className="prof" src={`${ProfilePic}`} alt="witness" />
          <p>
            I love milmag the dinig the kitchen is clean and beautiful, the food
            is more than its look. we am lucky for to have such restuarant
          </p>
          <div className="social-icon">
            <img src={`${Instagram}`} alt="Instagram" />
            <img src={`${Facebook}`} alt="FaceBook" />
            <img src={`${Tiwter}`} alt="Twiter" />
          </div>
        </div>
        <div className="witness">
          <img className="prof" src={`${ProfilePic}`} alt="witness" />
          <p>
            I love milmag the dinig the kitchen is clean and beautiful, the food
            is more than its look. we am lucky for to have such restuarant
          </p>
          <div className="social-icon">
            <img src={`${Instagram}`} alt="Instagram" />
            <img src={`${Facebook}`} alt="FaceBook" />
            <img src={`${Tiwter}`} alt="Twiter" />
          </div>
        </div>
        <div className="witness">
          <img className="prof" src={`${ProfilePic}`} alt="witness" />
          <p>
            I love milmag the dinig the kitchen is clean and beautiful, the food
            is more than its look. we am lucky for to have such restuarant
          </p>
          <div className="social-icon">
            <img src={`${Instagram}`} alt="Instagram" />
            <img src={`${Facebook}`} alt="FaceBook" />
            <img src={`${Tiwter}`} alt="Twiter" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
