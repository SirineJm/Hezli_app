import React from "react";
import "./bookings.css";

import carData from "./dummy-data/booking-cars.js";
import CarItem from "../../UI/CarItem";
import Sidebar from "../../Sidebar/Sidebar";
import TopNav from "../../TopNav/TopNav";

const Bookings = () => {
  return (
    <div id="root">
    <Sidebar/>

 <div className='main__layout'>
    <TopNav />
    <div class='content'>
    <div className="bookings">
      <div className="booking__wrapper">
        <h2 className="booking__title">Liste des Camions</h2>

        <div className="filter__widget-wrapper">
        {/*  <div className="filter__widget-01">

<select>
              <option value="New">New</option>
              <option value="Popular">Popular</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>*/}

          <div className="filter__widget-01">
            <select>
              <option value="camion">camion</option>
              <option value="voiture">voiture</option>
            </select>
          </div>
        </div>

        <div className="booking__car-list">
          {carData?.map((item) => (
            <CarItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
</div>
  );
};

export default Bookings;
