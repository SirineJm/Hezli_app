import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';

const MettreAJour = () => {
  const [isPasswordChangeVisible, setPasswordChangeVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitted1, setFormSubmitted1] = useState(false);

  const [error, setError] = useState(null); // Ajouter un état pour gérer les erreurs

  // États pour stocker les données de l'utilisateur
  const [userData, setUserData] = useState({
    id: '',
    nom: '',
    prenom: '',
    email: '',
    numero: '',
  });
  // État pour stocker les données de mot de passe
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const showPasswordChangeFields = () => {
    setPasswordChangeVisible(true);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur depuis le stockage local
    // Envoie une demande au serveur pour récupérer les données de l'utilisateur connecté en fonction de son ID
    axios
      .get(`/api/user/${userId}`)
      .then((response) => {
        const user = response.data; // Les données de l'utilisateur renvoyées par le serveur
        setUserData(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateUserData = () => {
    const userId = localStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur depuis le stockage local
    const updatedData = {
      // Créez un objet avec les données mises à jour
      id: userId,
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      numero: userData.numero,
    };
    // Envoyez une demande au serveur pour mettre à jour les données
    axios
      .post('http://localhost:3001/MettreAJour', { updatedData })
      .then((response) => {
        // Traitez la réponse du serveur
        console.log(response.data.message);
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updatePassword = () => {
    const userId = localStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur depuis le stockage local
    const updatedPasswordData = {
      id: userId,
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    };
    // Envoyez une demande au serveur pour mettre à jour le mot de passe
    axios
      .post('http://localhost:3001/MettreAJourMotDePasse', {
        updatedPasswordData,
      })
      .then((response) => {
        // Traitez la réponse du serveur pour la mise à jour du mot de passe
        console.log(response.data.message);
        // Mettez à jour l'état pour afficher un message de succès
        setFormSubmitted1(true);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 402) {
          setError('Entrez un mot de passe valide et réessayez.');
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div className="user-profile">
      <div className="profil">
        <img
          src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
          alt="Profile"
          class="sc-iKvluX dpFRuy"
        ></img>
        <button className="sc-fSrEHN cigXqS">Nouvelle image</button>
      </div>

      <div>
        <div>
          <form className="formul">
            <h3>Informations Personnelles</h3>
            <div className="form-group1">
              <div>
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={userData.nom} // Utilisez la valeur actuelle de l'état userData
                  onChange={(e) =>
                    setUserData({ ...userData, nom: e.target.value })
                  } // Mettez à jour la valeur de nom dans l'état userData lorsqu'un changement est détecté
                />
              </div>
              <div>
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={userData.prenom}
                  onChange={(e) =>
                    setUserData({ ...userData, prenom: e.target.value })
                  } // Mettez à jour la valeur de prenom dans l'état userData lorsqu'un changement est détecté
                />
              </div>
            </div>
            <h3>Contact Personnel</h3>
            <div className="form-group2">
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  } // Mettez à jour la valeur de email dans l'état userData lorsqu'un changement est détecté
                />
              </div>
              <div>
                <label htmlFor="numero">Numéro de téléphone</label>
                <input
                  type="number"
                  id="numero"
                  name="numero"
                  value={userData.numero}
                  onChange={(e) =>
                    setUserData({ ...userData, numero: e.target.value })
                  } // Mettez à jour la valeur de numero dans l'état userData lorsqu'un changement est détecté
                />
              </div>
            </div>
            <div className="update">
              <button type="button" onClick={updateUserData}>
                Mettre à jour
              </button>
            </div>
            {formSubmitted && (
              <div className="mise">
                <p>Le profil a été mis à jour avec succès.</p>
              </div>
            )}
          </form>
        </div>

        <div className="upd">
          <a href="#" onClick={showPasswordChangeFields}>
            <h4>Modifier le mot de passe</h4>
          </a>
        </div>
        {isPasswordChangeVisible && (
          <form className="formul2">
            <div className="form-group3">
              <div>
                <input
                  type="password"
                  placeholder="Ancien mot de passe"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="update">
              <button type="button" onClick={updatePassword}>
                Mettre à jour
              </button>
            </div>
            {formSubmitted1 ? (
              <div className="mise1">
                <p>Le mot de passe a été mis à jour avec succès.</p>
              </div>
            ) : (
              error && (
                <div className="error">
                  <p>{error}</p>
                </div>
              )
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default MettreAJour;
