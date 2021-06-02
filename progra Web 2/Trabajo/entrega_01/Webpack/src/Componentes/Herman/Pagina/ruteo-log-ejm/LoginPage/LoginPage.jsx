import React,{ useContext } from "react";
import {
  useHistory,
  useLocation
} from "react-router-dom";
import {authContext} from "../contex/authContext"

export default function LoginPage(props) {
    let history = useHistory();
    let location = useLocation();
    let auth = useContext(authContext);
  
    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
      auth.signin(() => {
        history.replace(from);
      });
    };
  
    return (
      <div style={{width: "100%", maxWidth: "700px", alignItems: "center"}}>
        {
        (from.pathname==="/") ? "" : (<p>Para poder jugar se debe iniciar session {from.pathname}</p>)
        }
        {props.children}
        <button onClick={login}>Log in</button>
      </div>
    );
  }
  