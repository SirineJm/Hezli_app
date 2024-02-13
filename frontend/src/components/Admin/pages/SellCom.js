import React, { useState, useEffect } from 'react';
import '../../styles/sell-car.css';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import TopNav from '../../TopNav/TopNav';
const SellCom = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get('http://localhost:3001/getCommande')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete('http://localhost:3001/supp1/' + id)
      .then((res) => {
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="root">
    <Sidebar/>

 <div className='main__layout'>
    <TopNav />
    <div className="px-51 py-3">
      <div className="d-flex1 justify-content-center mt-2"></div>

      <div className="mt-31">
        <table className="table">
          <thead>
            <tr>
              <th>Date de départ</th>
              <th>Adresse de départ</th>
              <th>Adresse d'arrivé</th>
              <th>Objet</th>
              <th>Accés de depart</th>
              <th>Accés d'arrivé</th>
              <th>Le coût total</th>
              <th>Mode de paiement</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dep, index) => {
              return (
                <tr key={index}>
                  <td>
                    {' '}
                    {dep.date}, {dep.hour}h et{' '}
                    {dep.minute}m
                  </td>
                  <td>{dep.address}</td>
                  <td>{dep.Adresse_arrivée}</td>
                  <td>{dep.objets}</td>
                  <td>{dep.Accès_Dèpart}</td>
                  <td>{dep.Accès_arrivée}</td>
                  <td>{dep.totalCoût}$</td>
                  <td>{dep.Payer}</td>

                  <td>
                    <button
                      onClick={(e) => handleDelete(dep['id'])}
                      className="btn btn-sm btn-danger"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default SellCom;
