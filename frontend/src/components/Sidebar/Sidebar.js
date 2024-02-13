import React from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import navLinks from '../Admin/pages/dummy-data/navLinks';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

  // Fonction de déconnexion
  const handleLogout = () => {
    navigate('/estimation');
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2>
        
          <img
            src="https://hezli.tn/static/media/YellowLogo.d289153b718ec79bcef3.png"
            alt=""
          />
        </h2>
      </div>

      <div className="sidebar__content">
        <div className="menu">
          <ul className="nav__list">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? 'nav__active nav__link' : 'nav__link'
                  }
                >
                  <i className={item.icon}></i>

                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom">
          <span onClick={handleLogout}>
            <i class="ri-logout-circle-r-line"></i> Deconnexion
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
