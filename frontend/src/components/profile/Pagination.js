import React, { useEffect, useState } from 'react';
import MettreAJour from './MettreAJour';
import Compte from './Compte';
import Historique from './Historique';
import { Link} from 'react-router-dom';

function Pagination({ handleLogout }) {
  const [currentPage, setCurrentPage] = useState('Compte');


  // Fonction pour changer de page
  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="page-container">
      <div className="pagination-container">
        <div className="pagin">
          <div className="pagination">
            <ul className="prof">
              <li>
                {' '}
                <a
                  className={currentPage === 'Compte' ? 'active' : ''}
                  onClick={() => changePage('Compte')}
                >
                  {' '}
                  Compte
                </a>
              </li>
              <li>
                {' '}
                <a
                  className={currentPage === 'Historique' ? 'active' : ''}
                  onClick={() => changePage('Historique')}
                >
                  {' '}
                  Historique
                </a>
              </li>
              <li>
                {' '}
                <a
                  className={currentPage === 'Mettre à Jour' ? 'active' : ''}
                  onClick={() => changePage('Mettre à Jour')}
                >
                  {' '}
                  Mettre à Jour
                </a>
              </li>
              <li>
                {' '}
                <Link to="/connexion" onClick={handleLogout}>
                  Déconnexion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-container">
        {currentPage === 'Compte' && <Compte />}
        {currentPage === 'Historique' && <Historique />}
        {currentPage === 'Mettre à Jour' && <MettreAJour />}
      </div>
    </div>
  );
}

export default Pagination;
