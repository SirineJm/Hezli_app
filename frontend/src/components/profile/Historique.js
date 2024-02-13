import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Historique = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Effectuez une requête GET pour récupérer les données depuis le serveur
    axios
      .get('/historique')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des données depuis le serveur :',
          error
        );
      });
  }, []);

  const handleDelete = (id) => {
    // Code pour supprimer une ligne en fonction de l'ID
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  /*...Fonction pour formater la date.....................................................*/
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Jour avec zéro en tête
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois avec zéro en tête
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="histor">
      <div className="hist">
        <Link to="/depart">
          <button id="nouvelleReservation">Nouvelle Réservation</button>
        </Link>
      </div>
      <div>
        <h1>liste de livraison</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Adresse de Ramassage</th>
              <th>Adresse de Dépôt</th>
              <th>Date</th>
              <th>Les objets</th>
              <th>Coût total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Adresse_arrivée} </td>
                <td>{item.address}</td>
                <td>{`${formatDate(item.date)} à ${item.hour}:${
                  item.minute
                }`}</td>
                <td>{item.objets}</td>
                <td>{item.totalCoût} €</td>
                <td>{item.Payer}</td> {/* Affichage de Payer */}
                <td>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>Supprimer</button>
                  <Link to={`/historique/edit/${item.id}`}>
                    <button className="edit-button">Modifier</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historique;
