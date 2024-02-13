import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';

function Login() {
  const [values, setValues] = useState({ email: '',password: ''});
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState('');
  

  const handleLogin = (event) => {
    event.preventDefault();
  
    axios.post('http://localhost:3001/admin', values)
    .then((res) => {
       if (res.data.Status === "admin") {
        // Authentification réussie pour un administrateur, redirigez vers le tableau de bord admin
        navigate('/dashboard');
      } else {
        // Affichez un message d'erreur en cas d'échec d'authentification
        setError("Email ou mot de passe incorrect");
      }
    })
    .catch((err) => {
      console.error(err);
      setError("Erreur d'authentification");
    });
  }
  return (
    <div className='log-s'>
   <div className='left'> 
   <img src="https://dash.hezli.tn/static/media/BG.8fdc5ad339f303c5748f.png"/>
    </div> 
    <div className="right">
        <div className='Form-box'>
             
        <img src="https://hezli.tn/static/media/YellowLogo.d289153b718ec79bcef3.png" alt=""/>
      
      <h2>Connectez-vous à Hezli</h2>
        <form onSubmit={handleLogin}>
          
            <label htmlFor='email'>
              <p>Adresse e-mail</p>
            </label>
            <input
              type='email'
              placeholder='nom@exemple.com'
              name='email'
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
              className='form-control56 rounded-0'
              autoComplete='off'
            />
         <div className='text-danger5'>{error && error}</div>
            <label htmlFor='password'>
              <p>Mot de Passe</p>
            </label>
            <input
              type='password'
              placeholder='Mot de passe'
              name='password'
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className='form-control56 rounded-0'
            />
            <div className='text-danger5'>{error && error}</div>
            <div className='mo-passe'>
            <a> Mot de passe oublié? </a>
            </div>
          <button type='submit' className='btn btn-success6 w-100 rounded-0'>
            Connexion
          </button>
        </form>
        </div>
        </div>
        </div>
       
  
  );
}
export default Login;