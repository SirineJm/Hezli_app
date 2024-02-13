import React, { useState, useEffect } from 'react';
import "./dashboard.css";
import SingleCard from './SingleCard';
import axios from "axios";
import CarStatsChart from './charts/CarStatsChart';
import Sidebar from '../Sidebar/Sidebar';
import TopNav from '../TopNav/TopNav';

const Dashboard = () => {
  const [adminCount, setAdminCount] = useState()
  const [clientCount, setClientCount] = useState()
  const [commandecount, setCommande] = useState()
  const [countLivreur, setLivreur] = useState() 

  
  useEffect(() => {
    
    axios.get('http://localhost:3001/adminCount')
		.then(res => {
			setAdminCount(res.data[0].admin)
		}).catch(err => console.log(err));

    axios.get('http://localhost:3001/clientCount')
		.then(res => {
			setClientCount(res.data[0].users)
		}).catch(err => console.log(err));

    axios.get('http://localhost:3001/countCommande')
		.then(res => {
			setCommande(res.data[0].estimation)
		}).catch(err => console.log(err));
    axios.get('http://localhost:3001/countLivreur')
		.then(res => {
			setLivreur(res.data[0].chauffeur)
		}).catch(err => console.log(err));
  } , [])

const carObj = {
  title: "Total de camions",
  totalNumber: 30,
  icon: "ri-truck-line",
};

const tripObj = {
  title: "Nombre des Colis",
  totalNumber: commandecount ,
  icon: "ri-shopping-cart-line",
};

const clientObj = {
  title: "Nombre des Clients",
  totalNumber: clientCount,
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Nombre des livreurs",
  totalNumber: countLivreur,
icon: "ri-user-line",}
  return (

    <div id="root">
        <Sidebar/>

     <div className='main__layout'>
        <TopNav />
   <div class='content'>    
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

        <div className="statics">

          <div className="stats">
            <h3 className="stats__title"></h3>
            < CarStatsChart />
          </div>
        </div>        
      </div>

      </div>
    </div>
    
    </div>
 </div>
    
  );
};

export default Dashboard;
