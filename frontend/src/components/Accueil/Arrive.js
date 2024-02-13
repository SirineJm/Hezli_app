import './estimation.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Arrive = ({Adresse_arrivée, handleAdresse_arrivéeChange,handleIncrementArr,handleDecrementArr,
  isButtonClicked1Arr,isButtonClickedArr,buttonStyleArr,buttonStyle1Arr,handleButtonClick01,handleButtonClick11,isNameArr,countArr,
  isWithAcesArr,handleWithAcesArr}) => {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();
  const currentStep=2;
  const closePopup = () => {
    setShowPopup(false);
  };

 

  /*....................................................................*/
  const handleNext = (event) => {
    event.preventDefault();

    // Déterminez la valeur à envoyer en fonction du choix de l'utilisateur
    let Accès_arrivée = isButtonClicked1Arr ? 'Au pied du camion' : 'Chez Moi';
    // Si "Chez Moi" est sélectionné, ajoutez les informations de RDC ou count et Ascenseur
    if (isButtonClickedArr) {
      Accès_arrivée += isNameArr ? ', RDC' : `, ${countArr} , ${isWithAcesArr ? 'Avec Ascenseur' : 'Sans Ascenseur'}`;
    }

    axios.post('http://localhost:3001/arrive', { Adresse_arrivée, Accès_arrivée })
      .then((response) => {
        console.log(response.data); // Vous pouvez gérer la réponse ici
        navigate('/objet');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="pl"></div>
      <div className="stepper-wrapper">
        {currentStep >= 1 && (
          <div
            className={`stepper-item ${currentStep >= 1 ? 'completed' : ''}`}>
            <div className="step-counter">1</div>
          </div>
        )}
        <div className={`stepper-item ${currentStep === 2 ? 'completed' : ''}`}>
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
              {Adresse_arrivée && (
                <Link to="/depart">
                  <button className="bu-ret">&#8592;</button>
                </Link>
              )}
              <h2>ARRIVÉE</h2>
            </div>
            <div>
              <div className="input-con">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1428px-Google_Maps_icon_%282020%29.svg.png" alt=''/>
                <div className="custom-select-wrapper">
                  <input type="text"
                    placeholder="Adresse d’arrivée"
                    value={Adresse_arrivée}
                    onChange={handleAdresse_arrivéeChange}
                    required />
                </div>
              </div>
            </div>

            {Adresse_arrivée ? (
              <div className="input1">
                <div>
                  <div className="button-container">
                    Accès
                    <div className="button-wrapper">
                      <button
                        style={buttonStyleArr}
                        className={`button-primary ${
                          isButtonClicked1Arr ? 'button-clicked' : ''
                        }`}
                        onClick={handleButtonClick11}
                      > {isButtonClicked1Arr ? '✓ Au pied du camion' : 'Au pied du camion'}
                      </button>
                      <button
                        style={buttonStyle1Arr}
                        className={`button-secondary ${ isButtonClickedArr ? 'button-clicked' : ''
                        }`}
                        onClick={handleButtonClick01}>
                        {' '} {isButtonClickedArr ? '✓ Chez Moi' : 'Chez Moi'}
                      </button>
                    </div>
                  </div>
                  {isButtonClickedArr && (
                    <div>
                      <div className="input-row">
                        <div className="button-wrap">
                          <button className="button-minus"
                            onClick={handleDecrementArr}>-</button>
                          <span className="button-count">
                            {' '}
                            {isNameArr ? 'RDC' : countArr}
                          </span>
                          <button className="button-plus"
                            onClick={handleIncrementArr}>+</button>
                        </div>
                        {!isNameArr && (
                          <div className="input-bu2">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={isWithAcesArr}
                                onChange={handleWithAcesArr}
                              />
                              <span className="slider round"></span>
                            </label>
                            <p>
                              {isWithAcesArr ? 'Avec Ascenseur' : 'Sans Ascenseur'}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="my-6">
                        <div className="so">i</div>
                        <p>
                          Emballez vos objets, nos chauffeurs les transportent
                          avec soin dans le camion, protégés par sangles et
                          couvertures
                        </p>
                      </div>
                      <div className="butt">
                        <button onClick={handleNext}>saisir vos objets</button>
                      </div>
                    </div>
                  )}

                  {isButtonClicked1Arr && (
                    <div>
                      <div>
                        <div className="my-6">
                          <div className="so">i</div>
                          <p>
                            Vos objets seront chargés et protégés avec soin par
                            notre équipe dévouée au pied du camion. Satisfaction
                            garantie !
                          </p>
                        </div>
                        <div className="butt">
                            <button onClick={handleNext}>saisir vos objets </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
};
export default Arrive;
