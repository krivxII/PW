import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import ProvideAuth2 from "./contex/authContextHolder2.jsx"
import PrivateRoute from "./RutaPrivada/PrivateRoute.jsx"
import NonPrivateRoute from "./RutaPrivada/NonPrivateRoute.jsx"
import AuthButton from "./AuthButton/AuthButton.jsx"
import LoginPage  from "./LoginPage/LoginPage.jsx"
import LogoutPage  from "./LoginPage/LogoutPage.jsx"
import Navbar  from "../../NavBar/NavBar.jsx"
import RegisterForm from "../../Formularios/RegisterForm/authForms/RegisterForm.jsx"
import SessionForm from "../../Formularios/RegisterForm/authForms/LoginForm.jsx"
import "./App.css"
import {authContext}  from "./contex/authContext.js"
import Juego from "../../Juego/Partida/Partida.jsx"
import { ToastContainer } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css';





export default function AuthExample() {
  let auth = useContext(authContext);
  let history = useHistory();

  return (
    <ProvideAuth2>
      <Router>
       
        <Navbar/>

         
         <div className="body">

          <Switch>
            
            <NonPrivateRoute path="/registro">
            <LoginPage>
            <RegisterForm/>
            <SessionForm/>
            </LoginPage>
            </NonPrivateRoute>


            <NonPrivateRoute path="/auth">
              <LoginPage >
                <RegisterForm/>
              </LoginPage>
            </NonPrivateRoute>


            <PrivateRoute path="/juego">
              <Juego></Juego>
             { /*<ProtectedPage />*/}
            </PrivateRoute>
           
            <Route path="/">
            <LogoutPage >
            <PublicPage/>
            </LogoutPage>
            </Route>


          </Switch>

</div>
          <AuthButton />
      
      </Router>
      <ToastContainer/>
    </ProvideAuth2>
  );
}

  

function PublicPage() {
  return <h3>Bienvenido</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

