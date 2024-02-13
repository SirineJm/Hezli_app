import axios from 'axios';
import React, { useState , useEffect} from 'react'
import { useNavigate , useParams } from 'react-router-dom';
import "./add.css";
import TopNav from '../../TopNav/TopNav';
import Sidebar from '../../Sidebar/Sidebar';

const EditChauff = () => {


const [data, setData] = useState({
    nomprénom: '',
    Numéro: '',
    numheurs: '',
    salaire: '',
})
const navigate = useNavigate()

const {id} = useParams();

useEffect(()=> {
    axios.get('http://localhost:3001/getchauffeurs/'+id)
    .then(res => {
        setData({...data, nomprénom: res.data.Result[0].nomprénom,
            Numéro: res.data.Result[0].Numéro,
            numheurs: res.data.Result[0].numheurs,
            salaire: res.data.Result[0].salaire,
        })
    })
    .catch(err =>console.log(err));
}, [])

const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:3001/EditChauff/'+id, data)
    .then(res => {
        if(res.data.Status === "Success") {
            navigate('/sell-car')
        }
    })
    .catch(err => console.log(err));
}
return (
    <div id="root">
    <Sidebar/>

 <div className='main__layout'>
    <TopNav />
    <div className='page-chauff'>
<div className='d-flex flex-column align-items-center pt-4'>
<h2>Modifier un Livreur</h2>
        <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
                <label  htmlFor="inputName" className="form-label">Nom</label>
                <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                onChange={e => setData({...data, nomprénom :e.target.value})} value={data.nomprénom}/>
            </div>
            <div className="col-12">
                <label htmlFor="inputEmail4" className="form-label">Numéro de téléphone</label>
                <input type="number" className="form-control" id="inputEmail4" placeholder='Enter Number' autoComplete='off'
                onChange={e => setData({...data, Numéro: e.target.value})} value={data.Numéro}/>
            </div>
            <div className="col-12">
                <label htmlFor="inputPassword4" className="form-label">Nombre des heurs de travail</label>
                <input type="number" className="form-control" id="inputPassword4" placeholder='Enter numero des heurs'
                 onChange={e => setData({...data, numheurs: e.target.value})}value={data.numheurs}/>
                 
        </div>
  
            <div className="col-12">
                <label htmlFor="inputSal" className="form-label">Salaire</label>
                <input type="number" className="form-control" id="inputSal"  autoComplete='off'
                onChange={e => setData({...data, salaire: e.target.value})} value={data.salaire}/>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Modifier</button>
            </div>
        </form>
    </div>
    </div>
   </div>
</div>
)
}

export default EditChauff