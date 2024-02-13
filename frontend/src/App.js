import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Depart from './components/Accueil/Depart';
import Arrive from './components/Accueil/Arrive';
import Objets from './components/Accueil/Objets';
import Estimation from './components/Accueil/Estimation';
import Inscription from './components/Accueil/Inscription';
import Payement from './components/Accueil/Payement';
import MotDePasseOublié from './components/Accueil/MotDePasseOublié';
import objetsData from './Data';
import Pagination from './components/profile/Pagination';
import Compte from './components/profile/Compte';
import Connexion from './components/Connexion';
import Inscrire from './components/Inscrire';
import MotDePasseOubli from './components/MotDePasseOubli';
import About from './components/about/About';
import Service from './components/services/Service';
import EditHistoriqueItem from './components/profile/EditHistoriqueItem';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import Bookings from './components/Admin/pages/Bookings';
import SellCar from './components/Admin/pages/SellCar';
import Settings from './components/Admin/pages/Settings';
import EditChauff from './components/Admin/pages/EditChauff';
import AddChauf from './components/Admin/pages/AddChauf';
import SellCom from './components/Admin/pages/SellCom';
import Sidebar from './components/Sidebar/Sidebar';
import TopNav from './components/TopNav/TopNav';

function App() {
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('Heure');
  const [minute, setMinute] = useState('Minute');
  const [address, setAddress] = useState('');
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [isActivationClosed, setIsActivationClosed] = useState(false);
  const [objets, setobjets] = useState('');
  const [entries, setEntries] = useState([]);
  const [counts, setCounts] = useState({});
  const [Adresse_arrivée, setAdresse_arrivée] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  const [isButtonClicked1, setIsButtonClicked1] = useState(false);
  const [isButtonClickedArr, setIsButtonClickedArr] = useState(true);
  const [isButtonClicked1Arr, setIsButtonClicked1Arr] = useState(false);
  const [isName, setIsName] = useState(true);
  const [isNameArr, setIsNameArr] = useState(true);
  const [IsNameVisibleArr, setIsNameVisibleArr] = useState(false);
  const [count, setCount] = useState(0);
  const [countArr, setCountArr] = useState(0);
  const [isWithAces, setIsWithAces] = useState(false);
  const [isWithAcesArr, setIsWithAcesArr] = useState(false);
  const [totalCoût, setTotalCoût] = useState(0); // État pour stocker le coût total

  /*...............inscription............................................................................*/
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [numero, setNumero] = useState('');

  /*.......depart...............................................................................*/
  const handleDateChange = (event) => {
    setDate(event.target.value);
    if (isActivationClosed) {
      setIsActivationClosed(false);
    }
  };
  const handleHourChange = (event) => {
    setHour(event.target.value);
    // Si l'heure est modifiée, décochez "Au plus tôt"
    if (isActivationClosed) {
      setIsActivationClosed(false);
    }
  };

  const handleMinuteChange = (event) => {
    setMinute(event.target.value);
    // Si les minutes sont modifiées, décochez "Au plus tôt"
    if (isActivationClosed) {
      setIsActivationClosed(false);
    }
  };
  const handleActivationChange = () => {
    setIsActivationClosed(!isActivationClosed);
    setIsNameVisible(false);
    // Si "Au plus tôt" est coché, remplir automatiquement la date et l'heure actuelles plus une heure
    if (!isActivationClosed) {
      const now = new Date();
      now.setHours(now.getHours() + 1); // Ajouter une heure
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hour = now.getHours().toString().padStart(2, '0');
      const minute = now.getMinutes().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);
      setHour(hour);
      setMinute(minute);
    }
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setIsButtonClicked1(false);
  };

  const handleButtonClick1 = () => {
    setIsButtonClicked1(true);
    setIsButtonClicked(false);
  };

  const buttonStyle = {
    backgroundColor: isButtonClicked1 ? '#FFD700' : '#F5F5F5',
  };

  const buttonStyle1 = {
    backgroundColor: isButtonClicked ? '#FFD700' : '#F5F5F5',
  };

  const buttonStyleArr = {
    backgroundColor: isButtonClicked1Arr ? '#FFD700' : '#F5F5F5',
  };

  const buttonStyle1Arr = {
    backgroundColor: isButtonClickedArr ? '#FFD700' : '#F5F5F5',
  };

  /*............................*/
  const handleIncrementEtage = () => {
    setCount(count + 1);
    setIsName(false);
    if (count === -1) {
      setIsName('RDC');
    }
  };
  const handleDecrementEtage = () => {
    setCount(count - 1);
    setIsName(false);
    if (count === 1) {
      setIsName('RDC');
    }
  };
  const handleWithAces = () => {
    setIsWithAces(!isWithAces);
    setIsNameVisible(false);
  };
  /*.....arrivée.....................................................................*/

  const handleAdresse_arrivéeChange = (event) => {
    setAdresse_arrivée(event.target.value);
  };

  /*............................*/
  const handleIncrementArr = () => {
    setCountArr(countArr + 1);
    setIsNameArr(false);
    if (countArr === -1) {
      setIsNameArr('RDC');
    }
  };
  const handleDecrementArr = () => {
    setCountArr(countArr - 1);
    setIsNameArr(false);
    if (countArr === 1) {
      setIsNameArr('RDC');
    }
  };
  const handleWithAcesArr = () => {
    setIsWithAcesArr(!isWithAcesArr);
    setIsNameVisibleArr(false);
  };
  const handleButtonClick01 = () => {
    setIsButtonClickedArr(true);
    setIsButtonClicked1Arr(false);
  };

  const handleButtonClick11 = () => {
    setIsButtonClicked1Arr(true);
    setIsButtonClickedArr(false);
  };
  /*...objets.......................................................................*/
  const handleobjetsChange = (event) => {
    const selectedObject = event.target.value;
    setobjets(selectedObject);
    // Mettez à jour le compteur avec 1 pour l'objet sélectionné
    setCounts((prevCounts) => ({
      ...prevCounts,
      [selectedObject]: 1,
    }));
  };

  useEffect(() => {
    if (objets.trim() !== '') {
      setEntries([...entries, objets]);
      setobjets(''); // Réinitialisez le champ de sélection après l'ajout
    }
  }, [objets]);

  useEffect(() => {
    // Calculer le coût total lorsque les objets ou les quantités changent
    const calculatedTotal = entries.reduce((total, entry) => {
      const count = counts[entry];
      const objData = objetsData.find((obj) => obj.name === entry);
      const price = objData ? objData.price : 0;
      return total + count * price;
    }, 0);

    setTotalCoût(calculatedTotal); // Mettez à jour le coût total dans l'état
  }, [entries, counts]);

  /*......................................................*/

  const handleIncrement = (entry) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [entry]: (prevCounts[entry] || 0) + 1,
    }));
  };

  const handleDecrement = (entry) => {
    if (counts[entry] > 1) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [entry]: prevCounts[entry] - 1,
      }));
    } else {
      // Si le compteur atteint 0, supprimez l'entrée
      const updatedEntries = entries.filter((e) => e !== entry);
      setEntries(updatedEntries);
      // Réinitialisez le compteur à 0
      setCounts((prevCounts) => ({
        ...prevCounts,
        [entry]: 0,
      }));
    }
  };
  /*.....Deconnexion.............................................................................*/
  const [isConnected, setIsConnected] = useState(true); // Initialisez cet état en fonction de la connexion de l'utilisateur

  const handleLogout = () => {
    // Effectuez la déconnexion (par exemple, en supprimant l'ID utilisateur du localStorage)
    localStorage.removeItem('userId');
    // Mettez à jour l'état d'authentification pour déclencher la mise à jour dans Header
    setIsConnected(false);
  };

  /*................................................................................................*/
  return (
    <div className="App">
      <BrowserRouter>
      {window.location.pathname !== '/admin' && window.location.pathname !== '/dashboard' 
      && window.location.pathname !== '/bookings'  && window.location.pathname !== '/sell-car' 
      && window.location.pathname !== '/settings'  && window.location.pathname !== '/chauff'
      && window.location.pathname !== '/commande' && window.location.pathname !== '/EditChauff/:id'  ? (
        <Header isConnected={isConnected} setIsConnected={setIsConnected} />
        ) : null}
        <Routes>
          <Route
            path="/depart"
            element={
              <Depart
                date={date}
                hour={hour}
                minute={minute}
                handleDateChange={handleDateChange}
                handleHourChange={handleHourChange}
                handleMinuteChange={handleMinuteChange}
                isActivationClosed={isActivationClosed}
                handleActivationChange={handleActivationChange}
                address={address}
                handleAddressChange={handleAddressChange}
                isButtonClicked1={isButtonClicked1}
                isButtonClicked={isButtonClicked}
                buttonStyle={buttonStyle}
                buttonStyle1={buttonStyle1}
                handleButtonClick={handleButtonClick}
                handleButtonClick1={handleButtonClick1}
                isName={isName}
                count={count}
                setCount={setCount}
                isWithAces={isWithAces}
                setIsWithAces={setIsWithAces}
                handleWithAces={handleWithAces}
                handleIncrementEtage={handleIncrementEtage}
                handleDecrementEtage={handleDecrementEtage}
              />
            }
          />

          <Route
            path="/arrive"
            element={
              <Arrive
                Adresse_arrivée={Adresse_arrivée}
                handleAdresse_arrivéeChange={handleAdresse_arrivéeChange}
                handleIncrementArr={handleIncrementArr}
                handleDecrementArr={handleDecrementArr}
                buttonStyleArr={buttonStyleArr}
                buttonStyle1Arr={buttonStyle1Arr}
                isButtonClicked1Arr={isButtonClicked1Arr}
                isButtonClickedArr={isButtonClickedArr}
                handleButtonClick01={handleButtonClick01}
                handleButtonClick11={handleButtonClick11}
                isNameArr={isNameArr}
                countArr={countArr}
                isWithAcesArr={isWithAcesArr}
                handleWithAcesArr={handleWithAcesArr}
              />
            }
          />

          <Route
            path="/objet"
            element={
              <Objets
                handleobjetsChange={handleobjetsChange}
                objets={objets}
                entries={entries}
                counts={counts}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                totalCoût={totalCoût}
              />
            }
          />

          <Route
            path="/estimation"
            element={
              <Estimation
                date={date}
                hour={hour}
                minute={minute}
                handleDateChange={handleDateChange}
                handleHourChange={handleHourChange}
                handleMinuteChange={handleMinuteChange}
                address={address}
                handleAddressChange={handleAddressChange}
                handleActivationChange={handleActivationChange}
                isActivationClosed={isActivationClosed}
                handleobjetsChange={handleobjetsChange}
                objets={objets}
                setobjets={setobjets}
                entries={entries}
                setEntries={setEntries}
                counts={counts}
                setCounts={setCounts}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                isButtonClicked1={isButtonClicked1}
                isButtonClicked={isButtonClicked}
                buttonStyle={buttonStyle}
                buttonStyle1={buttonStyle1}
                handleButtonClick={handleButtonClick}
                handleButtonClick1={handleButtonClick1}
                handleButtonClick01={handleButtonClick01}
                handleButtonClick11={handleButtonClick11}
                isName={isName}
                count={count}
                setCount={setCount}
                isWithAces={isWithAces}
                setIsWithAces={setIsWithAces}
                handleWithAces={handleWithAces}
                handleIncrementEtage={handleIncrementEtage}
                handleDecrementEtage={handleDecrementEtage}
                countArr={countArr}
                handleIncrementArr={handleIncrementArr}
                handleDecrementArr={handleDecrementArr}
                isWithAcesArr={isWithAcesArr}
                handleWithAcesArr={handleWithAcesArr}
                isButtonClicked1Arr={isButtonClicked1Arr}
                isButtonClickedArr={isButtonClickedArr}
                buttonStyleArr={buttonStyleArr}
                buttonStyle1Arr={buttonStyle1Arr}
                setDate={setDate}
                setHour={setHour}
                setMinute={setMinute}
                setAddress={setAddress}
                totalCoût={totalCoût}
                setTotalCoût={setTotalCoût}
                Adresse_arrivée={Adresse_arrivée}
                handleAdresse_arrivéeChange={handleAdresse_arrivéeChange}
                setAdresse_arrivée={setAdresse_arrivée}
                isConnected={isConnected}
              />
            }
          />

          <Route
            path="/inscrit"
            element={
              <Inscription
                setIsConnected={setIsConnected}
                setEmail={setEmail}
                setPrenom={setPrenom}
                setNom={setNom}
                setPassword={setPassword}
                setPassConf={setPassConf}
                setNumero={setNumero}
                prenom={prenom}
                nom={nom}
                numero={numero}
                email={email}
                password={password}
                passConf={passConf}
              />
            }
          />
          <Route path="/mot-de-passe-oublie" element={<MotDePasseOublié />} />
          <Route path="/mot-de-passe-oublie1" element={<MotDePasseOubli />} />
          <Route
            path="/payement"
            element={
              <Payement totalCoût={totalCoût} isConnected={isConnected} />
            }
          />

          <Route
            path="/pagination"
            element={
              isConnected ? (
                <Pagination handleLogout={handleLogout} />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          />
          <Route
            path="/compte"
            element={
              <Compte
                prenom={prenom}
                nom={nom}
                numero={numero}
                email={email}
                password={password}
                passConf={passConf}
              />
            }
          />
          <Route
            path="/connexion"
            element={
              <Connexion
                setIsConnected={setIsConnected}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/inscript"
            element={
              <Inscrire
                setEmail={setEmail}
                setPrenom={setPrenom}
                setNom={setNom}
                setPassword={setPassword}
                setPassConf={setPassConf}
                setNumero={setNumero}
                prenom={prenom}
                nom={nom}
                numero={numero}
                email={email}
                password={password}
                passConf={passConf}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/historique/edit/:id" element={EditHistoriqueItem} />
        </Routes>


        <Routes>
           
           <Route path="/admin" element={<Login/>}/>
           {/* <Route path="/id" element={<Dashboard /> } /> */}
           <Route path="/dashboard" element={<Dashboard /> } />
           <Route path="/bookings" element={<Bookings />} />
           <Route path="/sell-car" element={<SellCar />} />
           <Route path="/settings" element={<Settings />} />
           <Route path="/chauff" element={<AddChauf />} />
           <Route path="/commande" element={<SellCom />} />
           <Route path="/EditChauff/:id" element={<EditChauff/>} />
                   
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
