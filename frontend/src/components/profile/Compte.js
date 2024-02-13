import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './profile.css'; 
function Compte() {

  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    email: '',
    numero: '',
  });
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur depuis le stockage local
    // Envoie une demande au serveur pour récupérer les données de l'utilisateur connecté en fonction de son ID
    axios.get(`/api/user/${userId}`)
      .then((response) => {
        const user = response.data; // Les données de l'utilisateur renvoyées par le serveur
        setUserData(user);
      })
      .catch((error) => {
        console.error(error);
        
      });
  }, []);

  return (
    <div>
      <div className='profil1'>
        <img src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png" alt="Profile" className="sc-iKvluX dpFRuy" />
      </div>
      <div>
        <form className='formul3'>
          <h3>Informations Personnelles</h3>
          <div className="form-group4">
            <div>
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={userData.nom} // Affichez le nom de l'utilisateur ici
              />
            </div>
            <div>
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={userData.prenom} 
              />
            </div>
          </div>
          <h3>Contact Personnel</h3>
          <div className="form-group4">
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
              />
            </div>
            <div>
              <label htmlFor="numero">Numéro de téléphone</label>
              <input
                type="number"
                id="numero"
                name="numero"
                value={userData.numero} 
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Compte;
