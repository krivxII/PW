import React, { useContext, useEffect, useState } from "react";
import {  useHistory, } from "react-router-dom";
import {authContext} from "../contex/authContext.js"
import {validarToken} from "../../../Formularios/RegisterForm/authForms/logic"
export default function AuthButton() {
    let history = useHistory();
    let auth = useContext(authContext);
  
    useEffect(()=>validarToken(auth,history),[]);

    return auth.user ? (
      

      <p>
        Welcome!{" "+auth.user+" "}
        <button
          onClick={() => {
            auth.signout(() => history.push("/"));
          }}
          >
          Sign out
        </button>
      </p>
          
    ) : (
      <p>You are not logged in.</p>
    );
  };
