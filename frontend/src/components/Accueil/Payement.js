import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './estimation.css';
import axios from 'axios';

function Payement({totalCoût,isConnected}) {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const handleCheckboxChange1 = () => {
    setIsChecked1(true);
    setIsChecked2(false);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked1(false);
    setIsChecked2(true);
  };

  const handleConfirmPayment = () => {
    // Vérifiez si la première radio est cochée
    if (isChecked1) {
      const Payer = 'Non payé';
      axios
        .post('http://localhost:3001/payement', { Payer })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      // Ouvrez la fenêtre modale en définissant l'état isModalOpen sur true
      setIsModalOpen1(true);
    } else if (isChecked2) {
      setIsModalOpen2(true);
    }
  };

  const handleCloseModal1 = () => {
    // Fermez la fenêtre modale en définissant l'état isModalOpen sur false
    setIsModalOpen1(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Pour empêcher le rechargement de la page
    const Payer = ' payé';
    axios
      .post('http://localhost:3001/payement', { Payer })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsModalOpen2(false);
    setIsModalOpen1(true);
  };

  const currentStep = 5;

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
        <div className={`stepper-item ${currentStep >= 4 ? 'completed' : ''}`}>
          {currentStep >= 4 && <div className="step-counter">4</div>}
        </div>
        <div className={`stepper-item ${currentStep >= 5 ? 'completed' : ''}`}>
          {currentStep >= 5 && <div className="step-counter">5</div>}
        </div>
      </div>

      <div className="Est">
        <div className="popup">
          <div>
           
          <Link to={isConnected ? "/estimation" : "/inscrit"}>
               <button className="bu-ret">&#8592;</button>
          </Link>
            <div className="obj">
              <h2>PAYEMENT</h2>
            </div>
          </div>
          <div className="all">
            <div className="conf">
              <label className="pay">
                <input
                  type="radio"
                  class="inp"
                  checked={isChecked1}
                  onChange={handleCheckboxChange1}
                />
                <div className="payer">
                  <h4>Payer à la livraison</h4>
                </div>
                <span className="fac">Payer en espèces à la livraison</span>
              </label>
              <label className="pay">
                <input
                  type="radio"
                  class="inp"
                  checked={isChecked2}
                  onChange={handleCheckboxChange2}
                />
                <div className="payer">
                  <h4>Cartes de crédit/débit</h4>
                  <img src="https://e7.pngegg.com/pngimages/1013/540/png-clipart-mastercard-mastercard.png"></img>
                </div>
                <span className="fac1">
                  Payer avec votre carte de crédit/débit
                </span>
              </label>
            </div>
            {isModalOpen1 && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Succès !! </h3>
                  <br></br>
                  <p>Votre commande a été passée avec succès</p>
                  <br></br>
                  <Link to="/depart">
                    <button onClick={handleCloseModal1}>OK</button>
                  </Link>
                </div>
              </div>
            )}
            {isModalOpen2 && (
              <div className="modal">
                <div className="modal-content1">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="number"
                      id="cardNumber"
                      placeholder="Numéro de carte"
                      name="cardNumber"
                      required
                    />
                    <input
                      type="text"
                      id="expirationDate"
                      name="expirationDate"
                      placeholder="Date d’expiration"
                      required
                      onFocus={(e) => {
                        e.target.type = 'date';
                        e.target.click();
                      }}
                     
                      onChange={(e) => {
                        if (!e.target.value) {
                          e.target.type = 'text';
                          e.target.value = 'Date d’expiration';
                        }
                      }}
                    />

                    <input
                      type="number"
                      id="securityCode"
                      placeholder="Code de sécurité"
                      name="securityCode"
                      required
                    />
                    <button type="submit">payer {totalCoût}€</button>
                  </form>
                </div>
              </div>
            )}
            <div className="butt">
              <button onClick={handleConfirmPayment}>
                Confirmer le paiement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payement;
