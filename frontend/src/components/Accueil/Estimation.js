import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './estimation.css';
import objetsData from '../../Data';

const Estimation = ({
  date,
  hour,
  minute,
  handleDateChange,
  handleHourChange,
  handleMinuteChange,
  address,
  handleAddressChange,
  handleActivationChange,
  isActivationClosed,
  handleobjetsChange,
  objets,
  setobjets,
  setEntries,
  setCounts,
  entries,
  counts,
  handleKeyPress,
  handleDecrement,
  handleIncrement,
  Adresse_arrivée,
  handleAdresse_arrivéeChange,
  setAdresse_arrivée,
  isButtonClicked1,
  isButtonClicked,
  buttonStyle,
  buttonStyle1,
  handleButtonClick,
  handleButtonClick1,
  isName,
  count,
  isWithAces,
  buttonStyleArr,
  buttonStyle1Arr,
  handleWithAces,
  handleIncrementEtage,
  handleDecrementEtage,
  handleIncrementArr,
  handleDecrementArr,
  countArr,
  isNameArr,
  isWithAcesArr,
  handleWithAcesArr,
  handleButtonClick01,
  handleButtonClick11,
  isButtonClicked1Arr,
  isButtonClickedArr,
  setDate,
  setHour,
  setMinute,
  setAddress,
  totalCoût,
  setTotalCoût,
  isConnected,
}) => {
  const currentStep = 4;
  const [selectedOption, setSelectedOption] = useState('optionAvecAide');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  /*..........................................................................................*/

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingAddDepart, setIsEditingAddDepart] = useState(false);
  const [isEditingAddArrivée, setIsEditingAddArrivée] = useState(false);
  const [isEditingDepart, setIsEditingDepart] = useState(false);
  const [isEditingArrivée, setIsEditingArrivée] = useState(false);

  /*....date.............................................................................*/
  const handleCancelEditDate = () => {
    // Réinitialisez les états et annulez l'édition
    setDate('');
    setHour('');
    setMinute('');
    setIsEditingDate(false);
  };

const handleConfirmEditDate = () => {
    // Créez un objet initialisé avec les valeurs actuelles depuis data
    const newData = {
      date: data.date,
      hour: data.hour,
      minute: data.minute,
    };

    // Mettez à jour les champs modifiés
    if (date !== '') {
      newData.date = date;
    }
    if (hour !== '') {
      newData.hour = hour;
    }
    if (minute !== '') {
      newData.minute = minute;
    }

    // Envoyez une requête POST vers votre serveur pour mettre à jour les données
    axios
      .post('http://localhost:3001/depart', newData)
      .then((response) => {
        console.log(response.data);
        // Réinitialisez les états et quittez le mode d'édition
        setDate('');
        setHour('');
        setMinute('');
        setIsEditingDate(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*..adresse depart......................................................................*/
  const handleCancelEditAddD = () => {
    // Réinitialisez les états et annulez l'édition
    setAddress('');
    setIsEditingAddDepart(false);
  };
  const handleConfirmEditAddD = () => {
    // Préparez les données à enregistrer dans la base de données
    const newData1 = {
      address: address !== '' ? address : data.address, // Utilisez la valeur actuelle si non modifiée
    };
    // Envoyez une requête POST vers votre serveur pour mettre à jour les données
    axios
      .post('http://localhost:3001/depart', newData1)
      .then((response) => {
        console.log(response.data);
        // Réinitialisez l'état de l'adresse et quittez le mode d'édition de l'adresse uniquement
        setAddress('');
        setIsEditingAddDepart(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /*..adresse d'arrivée......................................................................*/
  const handleCancelEditAddA = () => {
    // Réinitialisez les états et annulez l'édition
    setAdresse_arrivée('');
    setIsEditingAddArrivée(false);
  };

  const handleConfirmEditAddA = () => {
    // Préparez les données à enregistrer dans la base de données
    const newData2 = {
      Adresse_arrivée:
        Adresse_arrivée !== '' ? Adresse_arrivée : data.Adresse_arrivée,
    };
    // Envoyez une requête POST vers votre serveur pour mettre à jour les données
    axios
      .post('http://localhost:3001/arrive', newData2)
      .then((response) => {
        console.log(response.data);
        setAddress('');
        setIsEditingAddArrivée(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /*...objets .....................................................................*/

  const handleCancelEdit = () => {
    // Réinitialiser les états et annuler l'édition
    setobjets('');
    setEntries([]);
    setCounts({});
    setIsEditing(false);
  };
  const handleConfirmEdit = () => {
    // Enregistrer les modifications dans la base de données et réinitialiser l'état d'édition
    const allObjets = entries.map((entry) => {
      const count = counts[entry];
      return `${count}x ${entry} `;
    });
    const objetsToStore = allObjets.join(', ');
    axios
      .post('http://localhost:3001/objet', { objets: objetsToStore, totalCoût })
      .then((response) => {
        console.log(response.data);
        // Réinitialiser les états et quitter le mode d'édition
        setobjets('');
        setEntries([]);
        setCounts({});

        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*............................................................................*/

  useEffect(() => {
    // Fonction pour récupérer le totalCoût depuis le serveur
    const fetchTotalCoût = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/obtenirTotalCout'
        );
        setTotalCoût(response.data.totalCoût);
      } catch (error) {
        console.error(error);
      }
    };
    // Appelez la fonction pour récupérer le totalCoût au chargement du composant
    fetchTotalCoût();
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3001/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.err(err);
      });
  }, []);
  /*.................................................................................*/
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  /*...Fonction pour formater la date.....................................................*/
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

  
  /*.....insert dans valide.........................................................................*/
  const handleNext = () => {
    // Récupérez les données que vous souhaitez envoyer au serveur
    const dataToSend = {
      address: data.address,
      date: data.date,
      hour: data.hour,
      minute: data.minute,
      Adresse_arrivée: data.Adresse_arrivée,
      objets: data.objets,
      totalCoût: data.totalCoût,
      Accès_Dèpart: data.Accès_Dèpart,
      Accès_arrivée: data.Accès_arrivée,
    };
    // Effectuez la requête POST vers votre point de terminaison "estimation" sur le serveur
    axios.post('/estimation', dataToSend)
      .then((response) => {
        console.log(response.data); 
       
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*...........................................................................................................*/
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
      <div className="container-estim">
        <div
          className={`form ${
            selectedOption === 'optionAvecAide' ? 'selected' : 'unselected'
          }`}
          onClick={() => handleOptionChange('optionAvecAide')}
        >
          <div className="Estimation">
            <div className="popup1">
              <div className="box1">
                <Link to="/objet">
                  <button className="bu-ret">&#8592;</button>
                </Link>
                <div className="obj">
                  <h5>PRIX</h5>
                  <h3> {totalCoût}€</h3>
                </div>
                <div class="interrogation"></div>
              </div>

              <div className="img-cont">
                <h3> Option Avec Aide</h3>
                <img src=".\Img\i4.png" class="liv" alt=""></img>
                <img src=".\Img\i4.png" class="liv" alt=""></img>
                <img src=".\Img\i3.png" alt=""></img>
              </div>

              {isEditingDate ? (
                <div>
                  <div className="input-container-flexEdit">
                    <div className="input-containerEdit">
                      <label className="input-label-date">
                        <span className="input-icon"></span>
                        <input
                          type="date"
                          value={date}
                          onChange={handleDateChange}
                          className="input-con1-Edit"
                        />

                        {date && formatDate(date)}
                      </label>
                      {date ? '' : 'Aujourd’hui'}
                    </div>
                    <span>&nbsp;</span>
                    <div className="input-con2-Edit">
                      <label>
                        <select value={hour} onChange={handleHourChange}>
                          <option value="">Heure</option>
                          {Array.from({ length: 24 }, (_, i) => (
                            <option
                              key={i}
                              value={i.toString().padStart(2, '0')}
                            >
                              {i.toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <select value={minute} onChange={handleMinuteChange}>
                          <option value="">Minute</option>
                          {Array.from({ length: 60 }, (_, i) => (
                            <option
                              key={i}
                              value={i.toString().padStart(2, '0')}
                            >
                              {i.toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="input-bu-Edit">
                    <label className="switch-Edit">
                      <input
                        type="checkbox"
                        checked={isActivationClosed}
                        onChange={handleActivationChange}
                      />
                      <span className="sliderEdit round"></span>
                    </label>
                    <p>Au plus tôt (dans 1h)</p>
                  </div>

                  <div className="buttEdit">
                    <button
                      className="cancelButton"
                      onClick={handleCancelEditDate}
                    >
                      Annuler
                    </button>
                    <button
                      className="confirmButton"
                      onClick={handleConfirmEditDate}
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
              ) : isEditingAddDepart ? (
                <div>
                  <div className="input-conAdd">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1428px-Google_Maps_icon_%282020%29.svg.png"
                      alt=""
                    />
                    <div className="custom-select-wrapper">
                      <input
                        type="text"
                        placeholder="Adresse de départ"
                        value={address}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </div>
                  <div className="buttEdit">
                    <button
                      className="cancelButton"
                      onClick={handleCancelEditAddD}
                    >
                      {' '}
                      Annuler
                    </button>
                    <button
                      className="confirmButton"
                      onClick={handleConfirmEditAddD}
                    >
                      {' '}
                      Confirmer
                    </button>
                  </div>
                </div>
              ) : isEditingAddArrivée ? (
                <div>
                  <div className="input-conAdd">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1428px-Google_Maps_icon_%282020%29.svg.png"
                      alt=""
                    />
                    <div className="custom-select-wrapper">
                      <input
                        type="text"
                        placeholder="Adresse d’arrivée"
                        value={Adresse_arrivée}
                        onChange={handleAdresse_arrivéeChange}
                      />
                    </div>
                  </div>
                  <div className="buttEdit">
                    <button
                      className="cancelButton"
                      onClick={handleCancelEditAddA}
                    >
                      Annuler
                    </button>
                    <button
                      className="confirmButton"
                      onClick={handleConfirmEditAddA}
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
              ) : isEditing ? (
                <div>
                  <div className="input-container">
                    <div className="objet-input-container">
                      <div className="input-Edit">
                        <img
                          src="https://cdn.icon-icons.com/icons2/510/PNG/512/cube_icon-icons.com_50409.png"
                          alt=""
                        />
                        <div className="custom-select-wrapper-Edit">
                          <select
                            value={objets}
                            onChange={handleobjetsChange}
                            onKeyUp={handleKeyPress}
                          >
                            <option value="" disabled hidden>
                              Ex : 1 Table
                            </option>
                            {objetsData.map((object, index) => (
                              <option key={index} value={object.name}>
                                {object.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {entries.map((entry, index) => (
                    <div className="input-row-edit" key={index}>
                      <span className="input-label-edit">{entry}</span>
                      <div className="button-wrap11">
                        <button
                          className="button-minu"
                          onClick={() => handleDecrement(entry)}
                        >
                          -
                        </button>
                        <span className="button-coun">{counts[entry]}</span>
                        <button
                          className="button-plu"
                          onClick={() => handleIncrement(entry)}
                        >
                          {' '}
                          +{' '}
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="buttEdit">
                    <button className="cancelButton" onClick={handleCancelEdit}>
                      {' '}
                      Annuler
                    </button>
                    <button
                      className="confirmButton"
                      onClick={handleConfirmEdit}
                    >
                      {' '}
                      Confirmer
                    </button>
                  </div>
                </div>
              ) : isEditingDepart ? (
                <div>
                  <div className="button-containerEdit">
                    <h5>Accès</h5>
                    <div className="button-wrapperEdit">
                      <button
                        style={buttonStyle}
                        className={`button-primaryEdit ${
                          isButtonClicked1 ? 'button-clicked' : ''
                        }`}
                        onClick={handleButtonClick1}
                      >
                        {isButtonClicked1
                          ? '✓ Au pied du camion'
                          : 'Au pied du camion'}
                      </button>

                      <button
                        style={buttonStyle1}
                        className={`button-secondaryEdit ${
                          isButtonClicked ? 'button-clicked' : ''
                        }`}
                        onClick={handleButtonClick}
                      >
                        {' '}
                        {isButtonClicked ? '✓ Chez Moi' : 'Chez Moi'}
                      </button>
                    </div>
                  </div>
                  {isButtonClicked && (
                    <div>
                      <div className="input-rowE">
                        <div className="button-wrapEdit">
                          <button
                            className="button-minusEdit"
                            onClick={handleDecrementEtage}
                          >
                            -{' '}
                          </button>
                          <span className="button-countEdit">
                            {' '}
                            {isName ? 'RDC' : count}
                          </span>
                          <button
                            className="button-plusEdit"
                            onClick={handleIncrementEtage}
                          >
                            {' '}
                            +{' '}
                          </button>
                          {!isName && (
                            <div className="input-bu2-Edit">
                              <label className="switch-Edit">
                                <input
                                  type="checkbox"
                                  checked={isWithAces}
                                  onChange={handleWithAces}
                                />
                                <span className="sliderEdit round"></span>
                              </label>
                              <p>
                                {isWithAces
                                  ? 'Avec Ascenseur'
                                  : 'Sans Ascenseur'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="buttEdit">
                    <button className="cancelButton" onClick={handleCancelEdit}>
                      Annuler
                    </button>
                    <button
                      className="confirmButton"
                      onClick={handleConfirmEdit}
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
              ) : isEditingArrivée ? (
                <div>
                  <div className="button-containerEdit">
                    <h5>Accès</h5>
                    <div className="button-wrapperEdit">
                      <button
                        style={buttonStyleArr}
                        className={`button-primaryEdit ${
                          isButtonClicked1Arr ? 'button-clicked' : ''
                        }`}
                        onClick={handleButtonClick11}
                      >
                        {isButtonClicked1Arr
                          ? '✓ Au pied du camion'
                          : 'Au pied du camion'}
                      </button>
                      <button
                        style={buttonStyle1Arr}
                        className={`button-secondaryEdit ${
                          isButtonClickedArr ? 'button-clicked' : ''
                        }`}
                        onClick={handleButtonClick01}
                      >
                        {' '}
                        {isButtonClickedArr ? '✓ Chez Moi' : 'Chez Moi'}
                      </button>
                    </div>
                  </div>
                  {isButtonClickedArr && (
                    <div>
                      <div className="input-rowE">
                        <div className="button-wrapEdit">
                          <button
                            className="button-minusEdit"
                            onClick={handleDecrementArr}
                          >
                            -
                          </button>
                          <span className="button-countEdit">
                            {' '}
                            {isNameArr ? 'RDC' : countArr}
                          </span>
                          <button
                            className="button-plusEdit"
                            onClick={handleIncrementArr}
                          >
                            +
                          </button>
                        </div>
                        {!isNameArr && (
                          <div className="input-bu2-Edit">
                            <label className="switch-Edit">
                              <input
                                type="checkbox"
                                checked={isWithAcesArr}
                                onChange={handleWithAcesArr}
                              />
                              <span className="sliderEdit round"></span>
                            </label>
                            <p>
                              {isWithAcesArr
                                ? 'Avec Ascenseur'
                                : 'Sans Ascenseur'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="buttEdit">
                    <button className="cancelButton" onClick={handleCancelEdit}>
                      {' '}
                      Annuler
                    </button>
                    <button
                      className="confirmButton"
                      onClick={handleConfirmEdit}
                    >
                      {' '}
                      Confirmer{' '}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div class="option">
                    <img src=".\Img\i5.png" alt=""></img>
                    <div>
                      <p>Date de Dèpart </p>
                      <input
                        type="text"
                        placeholder="lundi ,27 mai ,de 8h à 10h"
                        value={data
                          .map(
                            (data, i) =>
                              `${formatDate(data.date)} ,de ${data.hour}h à ${
                                data.hour + 2
                              }h`
                          )
                          .join(', ')} // Utilisez join pour concaténer les éléments du tableau en une chaîne
                        id="editInput"
                      />
                    </div>
                    <button
                      id="editButton"
                      onClick={() => setIsEditingDate(!isEditingDate)}
                    >
                      <img src=".\Img\i6.png" alt=""></img>
                    </button>
                  </div>
                  <div class="option">
                    <img src=".\Img\i7.png" alt=""></img>
                    <div>
                      <p>Adresse de Dèpart </p>
                      <input
                        type="text"
                        placeholder="17ème Arrondissement, Paris, France"
                        value={data
                          .map((data, i) => `${data.address}`)
                          .join(', ')}
                        id="editInput"
                      />
                    </div>
                    <button
                      id="editButton"
                      onClick={() => setIsEditingAddDepart(!isEditingAddDepart)}
                    >
                      <img src=".\Img\i6.png" alt=""></img>
                    </button>
                  </div>
                  <div class="option">
                    <img src=".\Img\i7.png" alt=""></img>
                    <div>
                      <p>Adresse d’arrivée </p>
                      <input
                        type="text"
                        placeholder="3e Arrondissement, Paris, France"
                        value={data
                          .map((data, i) => `${data.Adresse_arrivée}`)
                          .join(', ')}
                        id="editInput"
                      />
                    </div>
                    <button
                      id="editButton"
                      onClick={() =>
                        setIsEditingAddArrivée(!isEditingAddArrivée)
                      }
                    >
                      <img src=".\Img\i6.png" alt=""></img>
                    </button>
                  </div>
                  <div class="option">
                    <img src=".\Img\i8.png" alt=""></img>
                    <div>
                      <p>Mes objets</p>
                      <input
                        type="text"
                        placeholder="1x Canapé 2 places, 2x Table < 4 personnes"
                        value={data
                          .map((data, i) => `${data.objets}`)
                          .join(', ')}
                        id="editInput"
                      />
                    </div>
                    <button onClick={() => setIsEditing(!isEditing)}>
                      <img src=".\Img\i6.png" alt=""></img>
                    </button>
                  </div>
                  <div class="option">
                    <img src=".\Img\i9.png" alt=""></img>
                    <div>
                      <p>Accès de Dèpart </p>
                      <input
                        type="text"
                        placeholder="Au pied du camion"
                        value={data
                          .map((data, i) => `${data.Accès_Dèpart}`)
                          .join(', ')}
                        id="editInput"
                      />
                    </div>
                    <button
                      onClick={() => setIsEditingDepart(!isEditingDepart)}
                    >
                      <img src=".\Img\i6.png" alt=""></img>
                    </button>
                  </div>
                  <div class="option">
                    <img src=".\Img\i9.png" alt=""></img>
                    <div>
                      <p>Accès d’arrivée </p>
                      <input
                        type="text"
                        placeholder="Chez moi , 2 , Avec Ascenseur"
                        value={data
                          .map((data, i) => `${data.Accès_arrivée}`)
                          .join(', ')}
                        id="editInput"
                      />
                    </div>
                    <button
                      onClick={() => setIsEditingArrivée(!isEditingArrivée)}
                    >
                      <img src=".\Img\i6.png" alt=""></img>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      
        
      </div>
      <div className="butt-cont1">
      <Link to={isConnected ? "/payement" : "/inscrit"}>
        <button onClick={handleNext}>Continue</button>
        </Link>
      </div>
         
    </div>
  );
};

export default Estimation;
