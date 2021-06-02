import React, { useReducer, useState ,useContext} from 'react';
import './App.css';
import {iniciarSession} from "./logic"
import {  useHistory } from "react-router-dom";
import {authContext} from "../../../Pagina/ruteo-log-ejm/contex/authContext"

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

function LogginForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  let auth = useContext(authContext);
  let history = useHistory();
  
  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
  
    const responsee = await  iniciarSession(formData.username,formData.pass,auth,history)
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
      <h1>Iniciar Sesion</h1>
      { formData.username ? formData.username : "no existes"}
      { formData.pass ? formData.name : "no existes"}
      
      {submitting 
      &&
      <div>Submtting Form...</div>
      }


      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
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

export default LogginForm;