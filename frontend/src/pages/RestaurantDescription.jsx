import React from "react";
import "./RestaurantDescription.css";
import Dining from "../assets/dining.png";
import Service from "../assets/waiters.png";

const RestaurantDescription = () => {
  return (
    <div className="restaurant-desc">
      <h1>Our Restaurant</h1>
      <p>for your comfort, service and freshness</p>
      <div className="main-container">
        <div className="dining-hall">
          <p>
            Step into our beautifully designed restaurant, where contemporary
            elegance meets cozy charm. Soft lighting and tasteful decor set the
            perfect backdrop for a memorable dining experience.
          </p>
          <img src={Dining} alt="Restaurant dining" />
        </div>
        <hr />

        <div className="dining-hall">
          <img src={Service} alt="Milmag Service" />
          <p>
            Step into our beautifully designed restaurant, where contemporary
            elegance meets cozy charm. Soft lighting and tasteful decor set the
            perfect backdrop for a memorable dining experience.
          </p>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default RestaurantDescription;
