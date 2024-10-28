import React from "react";
import "./RestaurantDescription.css";
import Dining from "../assets/dining.png";
import Service from "../assets/waiters.png";
import Food from "../assets/food.png";

const RestaurantDescription = () => {
  return (
    <div className="service-desc">
      <h1>Our Restaurant</h1>
      <p>for your comfort, service and freshness</p>
      <div className="service-desc-cont">
        <div className="desc-left">
          <p>
            Step into our beautifully designed restaurant, where contemporary
            elegance meets cozy charm. Soft lighting and tasteful decor set the
            perfect backdrop for a memorable dining experience.
          </p>
          <img src={Dining} alt="Restaurant dining" />
        </div>
        <hr />

        <div className="desc-right">
          <img src={Service} alt="Milmag Waiters" />
          <p>
            Step into our beautifully designed restaurant, where contemporary
            elegance meets cozy charm. Soft lighting and tasteful decor set the
            perfect backdrop for a memorable dining experience.
          </p>
        </div>
        <hr />

        <div className="desc-left">
          <p>
            Step into our beautifully designed restaurant, where contemporary
            elegance meets cozy charm. Soft lighting and tasteful decor set the
            perfect backdrop for a memorable dining experience.
          </p>
          <img src={Food} alt="Fresh food" />
        </div>
        <hr />
      </div>
    </div>
  );
};

export default RestaurantDescription;
