import './MotDePasseOublié.css';
import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const MotDePasseOublié = () => {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const resetPassword = (e) => {
    e.preventDefault();

    // Vérifiez si l'e-mail est rempli
    if (!email) {
      setResetStatus('Veuillez entrer votre adresse e-mail.');
      return;
    }

    // Envoyez une requête au serveur pour réinitialiser le mot de passe
    Axios.post("http://localhost:3001/reset-password", {
      email: email
    })
    .then((response) => {
      if (response.data.message) {
        setResetStatus(response.data.message);
        setNewPassword('');
      } else if (response.data.password) {
        setResetStatus(''); // Effacez le message de réinitialisation précédent
        setNewPassword(`Votre nouveau mot de passe est : ${response.data.password}`);
      }
    })
    .catch((error) => {
      console.error(error);
      setResetStatus('Une erreur s’est produite lors de la réinitialisation du mot de passe.');
    });
  };

  return (
    <div className='Forgot'>
      <div className='pl'>
        <form>
          <h2>Mot de passe oublié</h2>
          <Link to="/inscrit">
            <button className='bu-ret' >&#8592;</button>
          </Link>
          <div className="input-container">
            <label>Adresse e-mail</label>
            <input
              type="email"
              placeholder="Entrez votre adresse e-mail"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button type="submit" onClick={resetPassword}>
            Réinitialiser le mot de passe
          </button>
          <p>{resetStatus}</p>
          <p>{newPassword}</p>
        </form>
      </div>
    </div>
  );
};

export default MotDePasseOublié;
