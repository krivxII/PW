import React, { useContext } from "react";
import {
  NavLink,
} from "react-router-dom";


import "./App.css"
import {authContext}  from "../Pagina/ruteo-log-ejm/contex/authContext"


export default function NavBar() {
    const auth = useContext(authContext);
    return (
        <div>
            
            <ul className={"ul"}>
              <li className={"li"}>
                <NavLink  to="/juego" activeClassName="selected">Juega</NavLink>
              </li>
              <li className={"li"}>
                <NavLink to="/registro" activeClassName="selected">Registrate</NavLink>
              </li>
              <li className={"li"}>
                <NavLink to="/auth" activeClassName="selected">Inicia Sesion</NavLink>
              </li>
            
              <li className={"li2"}>
                {console.log(auth)}
                {auth?.user || "Bienvenido"}
              </li>
            </ul>
            
        </div>
            )
    }
