import React, { useState, useEffect } from 'react';
import '../../styles/settings.css';
import axios from 'axios'; // Importez Axios pour effectuer des requêtes HTTP
import TopNav from '../../TopNav/TopNav';
import Sidebar from '../../Sidebar/Sidebar';

const Settings = () => {
  const [data, setData] = useState({
    country: '',
    street: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8081/userData')
      .then((res) => {
        setData({
          ...data,
          country: res.data.Result[0].country,
          street: res.data.Result[0].street,
          email: res.data.Result[0].email,
          phoneNumber: res.data.Result[0].phoneNumber,
          birthDate: res.data.Result[0].birthDate,
          gender: res.data.Result[0].gender,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
    <Sidebar/>

 <div className='main__layout'>
    <TopNav />
    <div className="settings">
      <div className="settings__wrapper">
        <h2 className="settings__title">Paramètres</h2>

        <div className="settings__top">
          <button className="setting__btn active__btn">Profile</button>
        </div>

        <div className="details__form">
          <h2 className="profile__title">Profile</h2>
          <p className="profile__desc">Mettez à jour votre profil ici</p>
          <form>
            <div className="form__group">
              <div>
                <label>Vivre à</label>
                <input
                  type="text"
                  placeholder="France"
                  onChange={(e) =>
                    setData({ ...data, country: e.target.value })
                  }
                  value={data.country}
                />
              </div>

              <div>
                <label>Rue</label>
                <input
                  type="text"
                  placeholder="19 décembre"
                  onChange={(e) => setData({ ...data, street: e.target.value })}
                  value={data.street}
                />
              </div>
            </div>

            <div className="form__group">
              <div>
                <label>Email</label>
                <input
                  type="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                />
              </div>

              <div>
                <label>Numéro de téléphone</label>
                <input
                  type="number"
                  placeholder="+33 17*******"
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  value={data.phoneNumber}
                />
              </div>
            </div>

            <div className="form__group">
              <div>
                <label>Genre</label>
                <input
                  type="text"
                  placeholder="Homme"
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  value={data.gender}
                />
              </div>
            </div>

            <div className="form__group">
              <div>
                <label>Votre photo</label>
                <p className="profile-img__desc">
                  Ceci sera affiché dans votre profil
                </p>
                <input type="file" placeholder="choose file" />
              </div>

              <div className="profile__img-btns">
                <button className="dlt__btn">Supprimer</button>
                <button className="update__btn">Modifier</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
</div>
  );
};

export default Settings;
