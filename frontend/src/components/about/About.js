import React from 'react';
import './about.css';
import Footer from '../footer/Footer';

function About() {
  return (
    <div className="dkHSaO">
      <div className="dhFiJO">
        <video
          id="myVideo"
          alt="app video"
          autoPlay
          loop
          playsInline
          style={{ width: '100%', height: 'auto' }}>
          <source type="video/mp4" src="./img/v3.mp4" />
          <source type="video/webm" src="./img/v.webm" />
          <source type="video/mp4" src="./img/v2.mp4" />
        </video>
        <div className="opacity-background" style={{ position: 'absolute' }}>
          <div className="inner_content_hero_about">
            <h4 className="APH">À propos Hezli </h4>
            <h1>Livrer l'Excellence à Chaque Pas</h1>
            <h1>
              Explorer nos offres de transport exceptionnel en France, des
              solutions logistiques précises et performantes pour répondre à vos
              attentes.
            </h1>
          </div>
        </div>
      </div>
      <section className="dbWRLH">
        <section className="fjGJLt">
          <img src="./img/i11.png" className="kJswjJ" />
          <div className="paragraphe-service">
            <p className="chVeep"> NOTRE ENTREPRISE </p>
            <h1 className="eAjTtH "> Notre Service à Votre Portée </h1>
            <p className="enEnUZ">
              {' '}
              Hezli est une entreprise de livraison spécialisée dans le
              transport d'une large gamme d'articles, notamment de documents, de
              fournitures de bureau, de produits emballés, d'objets fragiles, de
              mobilier et d'équipement. Nous proposons ce service aussi bien aux
              entreprises de différents secteurs qu'aux particuliers en
              Île-de-France. Avec notre équipe compétente et dévouée, nous
              assurons la sécurité et la rapidité de vos colis. Qu'il s'agisse
              d'un petit colis ou d'un envoi massif, Hezli s'engage à livrer vos
              articles en toute sécurité et dans les délais prévus.
            </p>
          </div>
        </section>
      </section>

      <div className="idTHda">
        <img src="./img/i12.jpg" className=".background-image"></img>
        <div>
          <div className="kJHrGU">
            <img src="./img/i13.svg" className="gZTI"></img>
            <section className="ihcibL">
              <p className="uxhFj">
                Livraison rapide sécurisée. Très bon chauffeur courtois
                <span className="kaBgnQ">
                   et polie satisfaite je n’hésiterai pas à refaire appel à vos
                  services.{' '}
                </span>
              </p>
            </section>
          </div>
        </div>
      </div>

     <Footer/>
    </div>
  );
}

export default About;
