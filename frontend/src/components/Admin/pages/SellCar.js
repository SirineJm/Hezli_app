import React, { useState, useEffect } from 'react';
import '../../styles/sell-car.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import TopNav from '../../TopNav/TopNav';
const SellCar = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get('http://localhost:3001/getchauffeurs')
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
      .delete('http://localhost:3001/supp/' + id)
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
      <Link to="/chauff" className="btn1 btn-success">
        Ajouter un Livreur
      </Link>
      <div className="mt-31">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Numero de telephone</th>
              <th>Nombre des heures de travail</th>
              <th>Salaire</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Chauffeurs, index) => {
              return (
                <tr key={index}>
                  <td>{Chauffeurs.nomprénom}</td>
                  <td>{Chauffeurs.Numéro}</td>
                  <td>{Chauffeurs.numheurs}</td>
                  <td>{Chauffeurs.salaire}</td>
                  <td>
                    <Link
                      to={`/EditChauff/${Chauffeurs['id']}`}
                      className="btn btn-primary1 btn-sm me-2"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={(e) => handleDelete(Chauffeurs['id'])}
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

export default SellCar;
