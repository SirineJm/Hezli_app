import './inscription.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Axios from 'axios';
const Inscription = ({setEmail,setPrenom,setNom,setPassword,setPassConf,setNumero,prenom,nom,numero, email,password,
  passConf,setIsConnected}) => {
  /*...............................................................*/
  const [loginStatus, setLoginStatus] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
  const [isButtonIdentifiation, setIsButtonIdentifiation] = useState(true);
  const [isButtonIdentifiation1, setIsButtonIdentifiation1] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };
  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePassConfChange = (event) => {
    setPassConf(event.target.value);
  };
  const handleNumeroChange = (event) => {
    setNumero(event.target.value);
  };

  const handleButtonIdentifiation = () => {
    setIsButtonIdentifiation(true);
    setIsButtonIdentifiation1(false);
  };
  const handleButtonIdentifiation1 = () => {
    setIsButtonIdentifiation1(true);
    setIsButtonIdentifiation(false);
  };
  /*....................................................................................*/

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked); // Ajoutez une fonction pour gérer le changement d'état du checkbox
  };

  /*..backend..................................................................................*/

  const register = (e) => {
    e.preventDefault();

    // Vérifiez si tous les champs sont remplis
    if (!prenom || !nom || !numero || !email || !password || !passConf) {
      setRegisterStatus('Veuillez remplir tous les champs.');
      return; // Arrêtez la fonction si un champ est manquant
    }

    // Vérifiez si les mots de passe correspondent
    if (password !== passConf) {
      setRegisterStatus('Les mots de passe ne correspondent pas.');
      return; // Arrêtez la fonction si les mots de passe ne correspondent pas
    }

    // Vérifiez si le checkbox est coché
    if (!checkboxChecked) {
      setRegisterStatus('Veuillez accepter les termes et conditions.');
      return; // Arrêtez la fonction si le checkbox n'est pas coché
    }
    // Si tout est valide, envoyez la requête d'inscription
    Axios.post('http://localhost:3001/register', {
      prenom: prenom,
      nom: nom,
      numero: numero,
      email: email,
      password: password,
      passConf: passConf,
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setIsRegistered(true);
        setRegisterStatus('COMPTE CRÉÉ AVEC SUCCÈS');
        // Utilisez setTimeout pour revenir à la page d'identification après 2 secondes
        setTimeout(() => {
          setIsButtonIdentifiation(true);
          setIsButtonIdentifiation1(false);
        }, 2000);
      }
    });
  };

  const login = (e) => {
    e.preventDefault();
    // Vérifiez si tous les champs sont remplis
    if (!email || !password) {
      setLoginStatus('Veuillez remplir tous les champs.');
      return; // Arrêtez la fonction si un champ est manquant
    }
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setIsConnected(true);
        setLoginStatus(response.data[0].email);
        // Ajout de l'ID utilisateur au stockage local
        if (response.data[0].id) {
          localStorage.setItem('userId', response.data[0].id);
        }
        navigate('/payement');
      }
    });
  };

  /*..........................................................................................*/
  const buttonStyle = {
    backgroundColor: isButtonIdentifiation ? '#FFD700' : '#F5F5F5',
  };
  const buttonStyle1 = {
    backgroundColor: isButtonIdentifiation1 ? '#FFD700' : '#F5F5F5', // Change la couleur de fond en fonction de l'état
  };
  /*...................................................................................*/
  const currentStep = 4;

  return (
    <div className="container">
      <div className="pl"></div>
      <div className="stepper-wrapper">
        {currentStep >= 1 && (
          <div
            className={`stepper-item ${currentStep >= 1 ? 'completed' : ''}`}
          >
            <div className="step-counter">1</div>
          </div>
        )}
        <div className={`stepper-item ${currentStep >= 2 ? 'completed' : ''}`}>
          {currentStep >= 2 && <div className="step-counter">2</div>}
        </div>

        <div className={`stepper-item ${currentStep >= 3 ? 'completed' : ''}`}>
          {currentStep >= 3 && <div className="step-counter">3</div>}
        </div>
        <div className={`stepper-item ${currentStep === 4 ? 'completed' : ''}`}>
          {currentStep === 4 && <div className="step-counter">4</div>}
        </div>
        <div className={`stepper-item ${currentStep === 5 ? 'active' : ''}`}>
          {currentStep === 5 && <div className="step-counter">5</div>}
        </div>
      </div>

      <div className="popup">
        <div>
          <Link to="/estimation">
            <button className="bu-ret">&#8592;</button>
          </Link>
          <div className="obj">
            <h2>VOS INFORMATIONS</h2>
          </div>
        </div>
        <div className="button-wrapper1">
          <button
            style={buttonStyle}
            className={`button-primary ${
              isButtonIdentifiation1 ? 'button-clicked' : ''
            }`}
            onClick={handleButtonIdentifiation}
          >
            {isButtonIdentifiation1 ? 'S’identifier' : ' ✓ S’identifier'}
          </button>
          <button
            style={buttonStyle1}
            className={`button-secondary ${
              isButtonIdentifiation ? 'button-clicked' : ''
            }`}
            onClick={handleButtonIdentifiation1}
          >
            {' '}
            {isButtonIdentifiation ? 'S’inscrire' : '✓ S’inscrire'}
          </button>
        </div>

        {isButtonIdentifiation && (
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
              <Link to="/mot-de-passe-oublie">
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

            <div className="line-container">
              <hr className="horizontal-line" />
              <span className="legend">Ou connectez-vous en utilisant</span>
              <hr className="horizontal-line" />
            </div>
            <div className="input-container-flex1">
              <div className="fild2"></div>
              <div className="fild3" />
              <div className="fild4" />
            </div>
          </div>
        )}

        {isButtonIdentifiation1 && (
          <div>
            <div className="input-contain">
              <div className="input-container2">
                <fieldset className="fild1">
                  <legend>
                    <p>Prénom</p>
                  </legend>
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={prenom}
                    onChange={handlePrenomChange}
                    name="prenom"
                    className="input-con4"
                  />
                </fieldset>
              </div>
              <div className="input-container2">
                <fieldset className="fild1">
                  <legend>
                    <p>Nom de famille</p>
                  </legend>
                  <input
                    type="text"
                    placeholder="Nom de famille"
                    value={nom}
                    onChange={handleNomChange}
                    name="nom"
                    className="input-con4"
                  />
                </fieldset>
              </div>
            </div>

            <div className="input-container2">
              <fieldset className="fild1">
                <legend>
                  <p>Numéro de téléphone</p>
                </legend>
                <div className="phone-input-container">
                  <select className="phone-prefix">
                    <option value="+216">+216</option>
                    <option value="+33">+33</option>
                    <option value="+213">+213</option>
                    <option value="+49">+49</option>
                    <option value="+86">+86</option>
                    <option value="+61">+61</option>
                  </select>
                  <input
                    type="number"
                    placeholder=""
                    value={numero}
                    onChange={handleNumeroChange}
                    name="numero"
                    className="input-con5"
                  />
                </div>
              </fieldset>
            </div>

            <div className="input-container2">
              <fieldset className="fild1">
                <legend>
                  <p> Adresse Email</p>
                </legend>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  name="email"
                  className="input-con3"
                />
              </fieldset>
            </div>

            <div className="input-contain">
              <div className="input-container2">
                <fieldset className="fild1">
                  <legend>
                    <p>Mot de passe</p>
                  </legend>
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={handlePasswordChange}
                    name="password"
                    className="input-con4"
                  />
                </fieldset>
              </div>
              <div className="input-container2">
                <fieldset className="fild1">
                  <legend>
                    <p>Confirmez le mot de passe</p>
                  </legend>
                  <input
                    type="password"
                    placeholder="Confirmez le mot de passe"
                    value={passConf}
                    onChange={handlePassConfChange}
                    name="pass"
                    className="input-con4"
                  />
                </fieldset>
              </div>
            </div>
            <div className="check">
              <label>
                <input
                  type="checkbox"
                  checked={checkboxChecked}
                  onChange={handleCheckboxChange}
                />
                J'accepte tous les termes et conditions
              </label>
            </div>

            <div className="butt2">
              <button className="" type="submit" onClick={register}>
                S'inscrire
              </button>
            </div>
            <h1
              style={{
                color: 'red',
                fontSize: '12px',
                textAlign: 'center',
                marginTop: '5px',
              }}
            >
              {registerStatus}
            </h1>

            <div className="line-container">
              <hr className="horizontal-line" />
              <span className="legend">Ou inscrivez-vous avec</span>
              <hr className="horizontal-line" />
            </div>

            <div className="input-container-flex1">
              <div className="fild2" />
              <div className="fild3" />
              <div className="fild4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inscription;
