import {ModificarUsuario} from "../../../Persistencia/persistencia" 

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
  
 const response = await fetch("http://localhost:8085/flip", requestOptions)
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
setSuperState(text);
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
  
 const response = await fetch("http://localhost:8085/flipall", requestOptions)
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