import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./add.css";
import Sidebar from '../../Sidebar/Sidebar';
import TopNav from '../../TopNav/TopNav';
function AddChauf() {
	
	const [data, setData] = useState({
		nomprénom: '',
		Numéro: '',
		numheurs:'',
		salaire: ''	
})
	const navigate = useNavigate()

  const handleSubmit = () => {
    const formData = {
       nomprénom: data.nomprénom,
       Numéro: data.Numéro,
       numheurs: data.numheurs,
       salaire:data.salaire,
     };
   
     axios.post('http://localhost:3001/addChauff', formData)
       .then((res) => {
         console.log(res.data);
         navigate('/sell-car');
       })
       .catch((error) => {
         console.error(error);
       });
   };
	return (
    <div id="root">
    <Sidebar/>

 <div className='main__layout'>
    <TopNav />
    <div className='page-chauff'>
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Ajouter un livreur</h2>
			<form className="row g-3 w-50" onSubmit={handleSubmit}>
			<div className="col-12">
  <label htmlFor="inputName" className="form-label"> <h>Nom</h></label>
  <input 
    type="text" 
    className="form-control" 
    id="inputName" 
    placeholder='Enter Name' 
    autoComplete='off'
    value={data.nomprénom}
    onChange={e => setData({...data, nomprénom: e.target.value})}
    required
  />
</div>

<div className="col-12">
  <label htmlFor="inputEmail4" className="form-label">Numéro</label>
  <input 
    type="number" 
    className="form-control" 
    id="inputEmail4" 
    placeholder='Enter Number' 
    autoComplete='off'
    value={data.Numéro}
    onChange={e => setData({...data, Numéro: e.target.value})}
    required
  />
</div>

<div className="col-12">
  <label htmlFor="inputEmail4" className="form-label">Nombre des heurs de travail</label>
  <input 
    type="number" 
    className="form-control" 
    id="inputEmail4" 
    placeholder='Enter number' 
    autoComplete='off'
    value={data.numheurs}
    onChange={e => setData({...data, numheurs: e.target.value})}
    required
  />
</div>


<div className="col-12">
  <label htmlFor="inputSala" className="form-label">Salaire</label>
  <input 
    type="text" 
    className="form-control" 
    id="inputSala" 
    placeholder="10225" 
    autoComplete='off'
    value={data.salaire}
    onChange={e => setData({...data, salaire: e.target.value})}
    required
  />
</div>

<div className="col-12">
  <button type="submit" className="btn btn-primary">Ajouter</button>
</div>
</form>
</div>
</div>
</div>
</div>
	)
}
export default AddChauf