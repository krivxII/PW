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
      auth.signout(() => {
        history.replace(from);
      });
    };
  
    return (
      <div>
        {
        (from.pathname==="/") ? "" : (<p>Ya iniciaste session {from.pathname}</p>)
        }
        {props.children}
        <button onClick={login}>Log out</button>
      </div>
    );
  }
  