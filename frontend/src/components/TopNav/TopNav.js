import React from "react";

import { Link } from "react-router-dom";
import profileImg from "../../assets/images/pro.jpg";
import "./top-nav.css";

const TopNav = () => {
  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
      
        <div className="top__nav-right">
        
          <div className="profile">
            <Link to="/settings">
              <img src={profileImg} alt=" " />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
