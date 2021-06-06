import  { useState } from "react";
import {destruirToken} from "../../../Formularios/RegisterForm/authForms/logic"

const fakeAuth = {
  
  signin(cb) {
    
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
   
    setTimeout(cb, 100);
  }
};


export default function useProvideAuth() {
    const [user, setUser] = useState(null);
  
    const signin = (callBack,token="nono",userr ="preset") => {
      return fakeAuth.signin(() => {
        if(!(token==="nono"))
        localStorage.setItem('juegoToken', token);
        if(userr==="preset")
        setUser(userr);
        else { console.log(userr) ;setUser({...userr})}
        callBack();
      });
    };
  
    const signout = cb => {
      return fakeAuth.signout(() => {
        setUser(null);
        destruirToken();
        console.log("byebye")
        cb();
      });
    };
  
    return {
      user,
      signin,
      signout
    };
  }