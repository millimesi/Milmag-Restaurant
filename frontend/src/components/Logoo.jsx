import React from 'react';
import "../stylesheets/Logoo.css";
import Logo from "../assets/logo.png";

const Logoo = () => {

  return (
    <div>
      <p className="logoPara">
        <img src={Logo} alt="Milmag Logo" />
      </p>
    </div>
  )
}

export default Logoo;
