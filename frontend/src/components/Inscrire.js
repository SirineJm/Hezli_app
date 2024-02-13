import './Accueil/inscription.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


const Inscrire = ({setEmail,setPrenom,setNom,setPassword,setPassConf,setNumero,prenom,nom,numero, email,password,passConf}) => {
  /*...............................................................*/
  const [loginStatus, setLoginStatus] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
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
        setTimeout(() =>{ navigate('/connexion')}, 2000);
       
      }
    });
  };

  /*...................................................................................*/

  return (
    <div className="container">
      <div className="pl1"></div>
      <div className="popup">      
        
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
             <Link to='https://www.google.com/'> <div className="fild2" /> </Link>
             <Link to='https://www.facebook.com/'>  <div className="fild3" /> </Link>
             <Link to='https://www.apple.com/'>   <div className="fild4" /> </Link>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default Inscrire;