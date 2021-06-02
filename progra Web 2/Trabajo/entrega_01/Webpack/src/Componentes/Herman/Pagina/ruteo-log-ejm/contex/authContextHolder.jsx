import React , {useEffect} from "react";
import { authContext } from "./authContext";
import useProvideAuth from "./authContexCreator"



export default function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    return (
   
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
     
    );
  }