import {ModificarUsuario} from "../../../Persistencia/persistenciaUsuario" 
import { guardarPartida } from "../../../Persistencia/persistenciaPartida";
const e_server ="http://localhost:8085"
//const e_server = process.env.E_SERVER_URL || "http://localhost:8085"
async function flip(carta, SuperState, setSuperState, openModal,auth) {


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify([SuperState,carta]);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  console.log("fliping")
 const response = await fetch(c_server+"/flip", requestOptions)
 const newState = await response.json();  
 
 console.log(response);
 console.log(newState); 

 if ((600 > response.status) && (response.status > 499)) {//500
  console.log(response)
  console.log("error casual del profe se intentara de nuevo")
  
}
else if ((500 > response.status) && (response.status > 399)) {//400
  console.log(response)
  console.log("error 400 algo")
}
else if ((300 > response.status) && (response.status > 199)) {//300
  console.log("fasfasfas")
console.log(response)

if (newState.vidas < 1) {
  openModal()
  
  for (const carta of Object.keys(newState.cartas)) {
    newState.cartas[carta].flip = true
  }
 
  const newAuth = {...auth}
  console.log(newAuth);
  ModificarUsuario(newState,newAuth.user.nombreUsuario,newAuth.user.numeroVictorias, newAuth.user.numeroDerrotas+1,newAuth.user.numeroJuegos+1,auth)
  guardarPartida(newState)
  console.log("perdiste")
  openModal()

}
if (newState.paresRestantes < 1) {
  console.log("ganaste")
  const newAuth = {...auth}
  console.log(newAuth);
  ModificarUsuario(newState,newAuth.user.nombreUsuario,newAuth.user.numeroVictorias+1, newAuth.user.numeroDerrotas,newAuth.user.numeroJuegos+1,auth)
  guardarPartida(newState)
  openModal()
}



setSuperState(newState);
}
 


};


async function flipAllCards(SuperState, setSupertate) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify(SuperState);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
 const response = await fetch(c_server+"/flipall", requestOptions)
 const text = await response.json();  
 
 console.log(response);
 console.log(text); 

 if ((600 > response.status) && (response.status > 499)) {//500
  console.log(response)
  console.log("error casual del profe se intentara de nuevo")
  
}
else if ((500 > response.status) && (response.status > 399)) {//400
  console.log(response)
  console.log("error 400 algo")
}
else if ((300 > response.status) && (response.status > 199)) {//300
  console.log("fasfasfas")
console.log(response)
setSupertate(text);
} 

}


export { flip, flipAllCards }