import './Accueil/inscription.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


const Connexion = ({setEmail,setPassword, email,password,setIsConnected}) => {
  /*...............................................................*/
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /*..backend..................................................................................*/

  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginStatus('Veuillez remplir tous les champs.');
      return;
    }
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setIsConnected(true);
          setLoginStatus(response.data[0].email);
          // Ajout de l'ID utilisateur au stockage local
          if (response.data[0].id) {
            localStorage.setItem('userId', response.data[0].id);
          }
          // Redirection vers la page '/depart'
          navigate('/depart');
        }
      });
  };
  /*...................................................................................*/

  return (
    <div className="container">
      <div className="pl1"></div>
      <div className="popup">      
          <div>
            <div className="input-container2">
              <fieldset className="fild1">
                <legend>
                  <p> Adresse Email</p>
                </legend>
                <input
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={handleEmailChange}
                  name="email"
                  className="input-con3"
                />
              </fieldset>
            </div>
            <div className="input-container2">
              <fieldset className="fild1">
                <legend>
                  <p>Mot de passe</p>
                </legend>
                <input
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                  name="password"
                  className="input-con3"
                />
              </fieldset>
            </div>
            <div className="pass">
              <Link to="/mot-de-passe-oublie1">
                {' '}
                <p>Mot de passe oublié?</p>
              </Link>
            </div>
            <div className="butt1">
              <button className="" type="submit" onClick={login}>
                CONNEXION
              </button>
            </div>
            <h1
              style={{
                color: 'red',
                fontSize: '13px',
                textAlign: 'center',
                marginTop: '6px',
              }}
            >
              {loginStatus}
            </h1>
            <Link to='/inscript'>Inscrivez-vous maintenant!</Link>
            <div className="line-container">
              <hr className="horizontal-line" />
              <span className="legend">Ou connectez-vous en utilisant</span>
              <hr className="horizontal-line" />
            </div>
            <div className="input-container-flex1">
            <Link to='https://www.google.com/'> <div className="fild2" /> </Link>
             <Link to='https://www.facebook.com/'>  <div className="fild3" /> </Link>
             <Link to='https://www.apple.com/'>   <div className="fild4" /> </Link>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default Connexion;