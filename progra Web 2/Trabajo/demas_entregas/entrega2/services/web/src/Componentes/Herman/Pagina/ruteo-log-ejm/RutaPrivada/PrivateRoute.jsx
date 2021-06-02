import React, { useContext } from "react";
import {authContext} from "../contex/authContext"
import {
  Route,
  Redirect,
} from "react-router-dom";


export default function PrivateRoute({ children, ...rest }) {
    let authContex = useContext(authContext);

    function miRender({location}){
   return(   authContex.user ? 
            (children)
            :
            (<Redirect to={ { pathname: "/registro", state: { from: location } } }/>)
          )
    }

    return (
      <Route {...rest} /*Aca se le pasa la ruta*/ render={miRender}
      />
    );
  }

  ///Falta entender este componente