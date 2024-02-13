import React, { useState } from 'react';
import './estimation.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Depart({date,hour,minute,handleDateChange,handleHourChange,
  handleMinuteChange,address,handleAddressChange,handleActivationChange,isActivationClosed,
  isButtonClicked1,isButtonClicked,buttonStyle,buttonStyle1,handleButtonClick,handleButtonClick1,isName,
  count,isWithAces, handleWithAces,handleIncrementEtage,handleDecrementEtage})  
  {
  /*.....................................................................................................*/
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

 
  /*..............................................................*/
 
  /* Fonction pour formater la date...............................*/
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayName = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
    }).format(date);
    const dayOfMonth = date.getDate();
    const monthName = new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
    }).format(date);
    return `${dayName} ${dayOfMonth} ${monthName}`;
  };

  /*..............................................................................*/
  const closePopup = () => {
    setShowPopup(false);
  };
  /*..................................................................................*/

  const handleNext = (event) => {
    event.preventDefault();
    // Déterminez la valeur à envoyer en fonction du choix de l'utilisateur
    let Accès_Dèpart = isButtonClicked1 ? 'Au pied du camion' : 'Chez Moi';
    // Si "Chez Moi" est sélectionné, ajoutez les informations de RDC ou count et Ascenseur
     if (isButtonClicked) {
        Accès_Dèpart += isName ? ', RDC' : `, ${count} , ${isWithAces ? 'Avec Ascenseur' : 'Sans Ascenseur'}`;
      }
    axios.post('http://localhost:3001/depart', {address,date,hour,minute,Accès_Dèpart})
      .then((response) => {
        console.log(response.data); // Vous pouvez gérer la réponse ici
        navigate('/arrive'); // Naviguez vers la page d'arrivée après la requête POST
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const currentStep=1;

  /*...................................................................................*/
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
        <div className={`stepper-item ${currentStep === 2 ? 'active' : ''}`}>
          {currentStep === 2 && <div className="step-counter">2</div>}
        </div>
        <div className={`stepper-item ${currentStep === 3 ? 'active' : ''}`}>
          {currentStep === 3 && <div className="step-counter">3</div>}
        </div>
        <div className={`stepper-item ${currentStep === 4 ? 'active' : ''}`}>
          {currentStep === 4 && <div className="step-counter">4</div>}
        </div>
        <div className={`stepper-item ${currentStep === 5 ? 'active' : ''}`}>
          {currentStep === 5 && <div className="step-counter">5</div>}
        </div>
      </div>

      <div className="Est">
        {showPopup && (
          <div className="popup">
            <div>
              {address && (
                <Link to="/depart">
                  <button className="bu-ret">&#8592;</button>
                </Link> )}
              <h2>DÉPART</h2>
            </div>
            <div>
              <div className="input-con">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1428px-Google_Maps_icon_%282020%29.svg.png" alt=''/>
                <div className="custom-select-wrapper">
                  <input type="text"
                    placeholder="Adresse de départ"
                    value={address}
                    onChange={handleAddressChange} required/>
                </div>
              </div>
            </div>
            {address ? (
              <div className="input1">
                <div className="input-container-flex">
                  <div className="input-container1">
                    <label className="input-label">
                      <span className="input-icon"></span>
                      <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="input-con1" required/>

                      {date && formatDate(date)}
                    </label>
                    {date ? '' : 'Aujourd’hui'}
                  </div>

                  <span>&nbsp;</span>
                  <div className="input-con2">
                  <label >
                    <select value={hour} onChange={handleHourChange} required>
                      <option value="">Heure</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <select value={minute} onChange={handleMinuteChange} required>
                      <option value="">Minute</option>
                      {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </label>
                  </div>
                </div>
                <div className="input-bu">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isActivationClosed}
                      onChange={handleActivationChange}
                      />
                    <span className="slider round"></span>
                  </label>
                  <p>Au plus tôt (dans 1h)</p>
                </div>

                {date || isActivationClosed ? (
                  <div>
                    <div className="button-container">
                      Accès
                      <div className="button-wrapper">
                        <button
                          style={buttonStyle}
                          className={`button-primary ${ isButtonClicked1 ? 'button-clicked' : ''}`}
                          onClick={handleButtonClick1}>
                          {isButtonClicked1 ? '✓ Au pied du camion' : 'Au pied du camion'}
                        </button>
                        <button
                          style={buttonStyle1}
                          className={`button-secondary ${
                            isButtonClicked ? 'button-clicked' : ''
                          }`}
                          onClick={handleButtonClick}>{' '}
                          {isButtonClicked ? '✓ Chez Moi' : 'Chez Moi'}
                        </button>
                      </div>
                    </div>
                    {isButtonClicked && (
                      <div>
                        <div className="input-row">
                          <div className="button-wrap">
                            <button className="button-minus" onClick={handleDecrementEtage} >- </button>
                            <span className="button-count">
                              {' '}
                              {isName ? 'RDC' : count}
                            </span>
                            <button className="button-plus" onClick={handleIncrementEtage}> + </button>
                          </div>
                          {!isName && (
                            <div className="input-bu2">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={isWithAces}
                                  onChange={handleWithAces}
                                />
                                <span className="slider round"></span>
                              </label>
                              <p>
                                {isWithAces ? 'Avec Ascenseur' : 'Sans Ascenseur'}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="my-6">
                          <div className="so">i</div>
                          <p>
                            Emballez vos objets, nos chauffeurs les transportent
                            avec soin dans le camion, protégés par sangles et
                            couvertures.
                          </p>
                        </div>
                        <div className="butt">
                          <button onClick={handleNext}>saisir l'arrivée</button>
                        </div>
                      </div>
                    )}

                    {isButtonClicked1 && (
                      <div>
                        <div>
                          <div className="my-6">
                            <div className="so">i</div>
                            <p>
                              Vos objets seront chargés et protégés avec soin
                              par notre équipe dévouée au pied du camion.
                              Satisfaction garantie !
                            </p>
                          </div>
                          <div className="butt">
                              <button onClick={handleNext}>saisir l'arrivée</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="my-6">
                      <div className="so1">i</div>
                      <p>
                        Vous pouvez choisir "Au plus tôt" pour une prise en
                        charge dans l'heure, ou planifier une date et une heure
                        spécifique.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <span className="close-button" onClick={closePopup}>
                {' '}
                &times;
              </span>
            )}
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Depart;
