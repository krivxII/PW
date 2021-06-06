import {guardarPartida} from "./persistenciaPartida"

const k_server = process.env.K_SERVER_URL ||  "http://localhost:8083"
//const k_server =   "http://localhost:8083"
async function ModificarUsuario(SuperState,usuario,ganadas,perdidas,partidas, auth) {
  
  console.log("tratande de modificar usuario hraph");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
let raw = JSON.stringify({usuario,ganadas,perdidas,partidas});
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  const response =  await fetch(k_server+"/modificarUsuario", requestOptions).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));
 
console.log(response)

  let mensaje;

  if ((600 > response.status) && (response.status > 499)) {//500
    console.log(response)
    console.log("error casual del profe se intentara de nuevo")
    ModificarUsuario(usuario,contraseña, auth, history,iniciarSession)
  }
  else if ((500 > response.status) && (response.status > 399)) {//400
    console.log(response)
    console.log("error 400 algo")
  }
  else if ((300 > response.status) && (response.status > 199)) {//300
    console.log(response.body.usuario)
    console.log("usuario modificado")
    guardarPartida(SuperState);
    auth.signin(() => console.log("usuario modificado"), "nono",response.body.usuario)
  }

// console.log("---------------------------------------------------------------")

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// let raw = JSON.stringify({usuario,ganadas,perdidas,partidas});
// console.log(raw)
// let requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

//   console.log("tratande de modificar usuario hraph");

  

  
//   const response =  await fetch("http://localhost:8083/modificarUsuario", requestOptions)
// console.log(response)

//   let mensaje;

//   if ((600 > response.status) && (response.status > 499)) {//500
//     console.log(response)
//     console.log("error casual del profe se intentara de nuevo")
//     CrearUsuario(usuario,contraseña, auth, history,iniciarSession)
//   }
//   else if ((500 > response.status) && (response.status > 399)) {//400
//     console.log(response)
//     console.log("error 400 algo")
//   }
//   else if ((300 > response.status) && (response.status > 199)) {//300
//     console.log(response.body.data.modificarUsuario)
//     console.log("usuario modificado")
//     guardarPartida(SuperState);
//     auth.signin(() => console.log("usuario modificado"), "null",response.body.data.modificarUsuario)
//   }

}



async function ObtenerUsuario(usuario, auth, history,token="nono") {//listo no se usa
  console.log("asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
  console.log("tratando de obtener Usuario de persistencia  ")
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
 
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: usuario,
    redirect: 'follow'
  };
  
  const response = await fetch(k_server+"/", requestOptions).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));
  
  
  
  
  
  
  if ((600 > response.status) && (response.status > 499)) {//500
    console.log(response)
    console.log("error casual del profe se intentara de nuevo")
    CrearUsuario(usuario,contraseña, auth, history)
  }
  else if ((500 > response.status) && (response.status > 399)) {//400
    console.log(response)
    console.log("error 400 algo en ObtenerUsuario Persistencia")
  }
  else if ((300 > response.status) && (response.status > 199)) {//300
    console.log(response.body.data.getUser)
    console.log("usuario Obtenido de persistencia")
    
    auth.signin(() => history.push("/"), "nono",response.body)
  }
  console.log("mala persistencia")
}


async function CrearUsuario(nombre,usuario,contraseña, auth, history ) {//nuevo funcional 
  console.log("tratande de crear usuario hraph");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({"username":usuario,"firstName":nombre,"password":contraseña});
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  const response =  await fetch(k_server+"/registrarUsuario", requestOptions).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));
  
  
  
  
  console.log(response)
  
  
  
  if ((600 > response.status) && (response.status > 499)) {//500
    console.log(response)
    console.log("error casual del profe se intentara de nuevo")
    CrearUsuario(usuario,contraseña, auth, history,iniciarSession)
  }
  else if ((500 > response.status) && (response.status > 399)) {//400
    console.log(response)
    console.log("error 400 algo")
  }
  else if ((300 > response.status) && (response.status > 199)) {//300
    console.log(response)
    console.log("usuario creado")
    auth.signin(() => history.push("/"), response.body.token,response.body.usuario)
  }
  
}


export {CrearUsuario,ObtenerUsuario,ModificarUsuario}


