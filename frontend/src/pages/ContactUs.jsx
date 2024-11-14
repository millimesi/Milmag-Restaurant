import React from "react";
import "./ContactUss.css";
import Instagram from "../assets/Ellipse 6.png";
import Facebook from "../assets/Ellipse 7.png";
import Tiwter from "../assets/Ellipse 9.png";
// import Map from "../assets/map.png";
import Restuarnat from "../assets/happyrest.png";
import Location from "../assets/location.png";

const ContactUs = () => {
  return (
    <div className="ContactUs-footer">
      <img className="background" src={Restuarnat} alt="Restaurant dining" />
      <div className="contactus-heading">
        <h1>Contact Us</h1>
        <p>Get in touch, Visit Us</p>
      </div>
      {/* <img className="map" src={`${Map}`} alt="Milmag location" /> */}
      <div className="footer-social-icon">
        <p>
          <img src={`${Location}`} alt="Location" />
          <a href="https://maps.app.goo.gl/rCoh7MpAgmsyZ3BdA">Come Vists Us</a> 
        </p>
        <p>
          <img src={`${Instagram}`} alt="FaceBook" />
          Follow Us on facebook
        </p>
        <p>
          <img src={`${Facebook}`} alt="Instagram" />
          Follow Us on instagram
        </p>
        <p>
          <img src={`${Tiwter}`} alt="Twiter" />
          Follow Us on twiter
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
