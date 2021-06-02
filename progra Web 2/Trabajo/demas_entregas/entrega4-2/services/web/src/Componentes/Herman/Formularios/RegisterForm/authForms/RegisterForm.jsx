import React, { useReducer, useState , useContext} from 'react';
import './App.css';;
import {registrar} from "./logic";
import {  useHistory } from "react-router-dom";
import {authContext} from "../../../Pagina/ruteo-log-ejm/contex/authContext"

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}


function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  let auth = useContext(authContext);
  let history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    
    const responsee = await registrar(formData.name,formData.username,formData.pass,auth,history)
    setSubmitting(false);
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return(
    <div className="wrapper">

      <h1>Registrate</h1>
      { formData.name ? formData.name : "no existes"}
      { formData.username ? formData.username : "no existes"}
      { formData.pass ? formData.name : "no existes"}
      
      {submitting 
      &&
      <div>Submtting Form...</div>
      }


      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" onChange={handleChange}/>
            <p>UserName</p>
            <input name="username" onChange={handleChange}/>
            <p>Pass</p>
            <input name="pass" type="password" onChange={handleChange}/>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>

     
    </div>
  )
}

export default App;