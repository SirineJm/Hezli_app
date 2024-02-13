import './estimation.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import objetsData from '../../Data';

const Objets = ({
  handleobjetsChange,
  objets,
  entries,
  counts,
  handleIncrement,
  handleDecrement,
  totalCoût
}) => {
  const currentStep = 3;
  const navigate = useNavigate();

  const handleNext = (event) => {
    event.preventDefault();
    // Collectez toutes les entrées d'objets dans un tableau
    const allObjets = entries.map((entry) => {
    const count = counts[entry];
    return `${count}x ${entry}`;
    });
   
    // Joignez toutes les entrées en une seule chaîne séparée par des virgules
    const objetsToStore = allObjets.join(', ');
   
    // Effectuez une requête POST pour mettre à jour la base de données
    axios
      .post('http://localhost:3001/objet', { objets: objetsToStore,totalCoût })
      .then((response) => {
        console.log(response.data); // Vous pouvez gérer la réponse ici
        navigate('/estimation'); // Naviguez vers la page d'arrivée après la requête POST
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*............................................................................................................*/
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

        <div className={`stepper-item ${currentStep === 3 ? 'completed' : ''}`}>
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
        <div className="popup">
          <div>
            <Link to="/arrive">
              <button className="bu-ret">&#8592;</button>
            </Link>
            <div className="obj">
              <h2>VOS OBJETS</h2>
            </div>
          </div>
          <div className="input-container">
            <div className="objet-input-container">
              <div className="input-con6">
                <img
                  src="https://cdn.icon-icons.com/icons2/510/PNG/512/cube_icon-icons.com_50409.png"
                  alt=""
                />
                <div className="custom-select-wrapper1">
                  <select value={objets} onChange={handleobjetsChange}>
                    <option value="" disabled hidden style={{ color: 'black' }}>
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
            <div className="input-row" key={index}>
              <span className="input-label1">{entry}</span>
              <div className="button-wrap1">
                <button
                  className="button-minus"
                  onClick={() => handleDecrement(entry)}> -
                </button>
                <span className="button-count">{counts[entry]}</span>
                <button
                  className="button-plus"
                  onClick={() => handleIncrement(entry)}
                >
                  {' '}
                  +{' '}
                </button>
              </div>
            </div>
          ))}
          <div className="my-5">
            <div className="so2">i</div>
            <p>
              Pour une facturation précise, choisissez un objet similaire dans
              la recherche. Si l'objet n'est pas trouvé, sélectionnez une taille
              similaire dans la liste. Contactez-nous pour toute question.
            </p>
          </div>
          {entries && (
            <div className="butt">
              <button onClick={handleNext} className="">
                Sécurity
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Objets;
