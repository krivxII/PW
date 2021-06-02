import React , {useEffect} from "react";
import { authContext } from "./authContext";
import useProvideAuth from "./authContexCreator"
import ProvideAuth from "./authContextHolder.jsx"


export default function ProvideAuth2({ children }) {
    

    return (
   
      <ProvideAuth>
        {children}
      </ProvideAuth>
     
    );
  }