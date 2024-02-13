import React, { useEffect, useState } from 'react';
import "./header.css"
const Header = ( {isConnected,setIsConnected}) => {


  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement de la page
    const userId = localStorage.getItem('userId');
    setIsConnected(!!userId); // Utilisez !! pour convertir la valeur en booléen
  }, []);

  return (
    <header>
      <nav className='flexSB'> 
      <div className='logo'>
              <img src='https://hezli.tn/static/media/YellowLogo.d289153b718ec79bcef3.png' alt='' />
            </div>
        <ul className='flexSB' >
        <li><a href="/depart" className={window.location.pathname === '/depart'|| window.location.pathname ==='/arrive'||
         window.location.pathname ==='/objet' || window.location.pathname === '/estimation'||  window.location.pathname ==='/inscrit'
          ? 'active' : ''}>ACCEUIL</a></li>
        <li><a href="/about" className={window.location.pathname === '/about' ? 'active' : ''}>À PROPOS DE NOUS</a></li>
        <li><a href="/service" className={window.location.pathname === '/service' ? 'active' : ''}>NOS SERVICES</a></li>
    <li><a href="/partenaire" className={window.location.pathname === '/partenaire' ? 'active' : ''}>DEVENIR UN PARTENAIRE</a></li>

        </ul>
       <div className='flexSB'>
          <select >
            <option value="fr">Fr</option>
            <option value="Ar">Ar</option>
            <option value="en">En</option>
            <option value="es">Es</option>
            <option value="de">De</option>
          </select>
       </div>
       {!isConnected ? (
          <div className='conn'>
                 <a href="/connexion" className={`button-link ${window.location.pathname === '/connexion' ? 'active-button' : ''}`}>
             <button className='inscrire-btn'> Connexion</button>
              </a>
       <a href="/inscript" className={`button-link ${window.location.pathname === '/inscript' ? 'active-button' : ''}`}>
           <button className='inscrire-btn'>S'inscrire</button>
        </a>
          </div>
        ) : (
          <div className='conn'>
            <a href="/pagination" className={window.location.pathname === '/pagination' ? 'active' : ''}>  
            <img src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png" alt="Profile" className="img-profil" />
           </a>
          </div>
        )}

      </nav>
    </header>
  );
};

export default Header;
