import React from "react";
import "./ContactUss.css";
import Instagram from "../assets/Ellipse 6.png";
import Facebook from "../assets/Ellipse 7.png";
import Tiwter from "../assets/Ellipse 9.png";
// import Map from "../assets/map.png";
import Logo from "../assets/logo.png";

const ContactUs = () => {
  return (
    <div
      className="ContactUs-footer"
      style={{ backgroundImage: `url(${Logo})` }}
    >
      <h1>Contact Us</h1>
      <p>Get in touch, Visit Us</p>
      {/* <img className="map" src={`${Map}`} alt="Milmag location" /> */}
      <div className="footer-social-icon">
        <p>
          <img src={`${Instagram}`} alt="Instagram" />
          Follow Us on Instagram
        </p>
        <p>
          <img src={`${Facebook}`} alt="FaceBook" />
          Follow Us on Twiter
        </p>
        <p>
          <img src={`${Tiwter}`} alt="Twiter" />
          Follow Us on Twiter
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
