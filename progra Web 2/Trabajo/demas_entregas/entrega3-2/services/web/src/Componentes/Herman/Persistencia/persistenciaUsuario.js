import {guardarPartida} from "./persistenciaPartida"
const appId="2710638a-a986-442f-b029-feb40bd4d4dd";

async function ModificarUsuario(SuperState,usuario,ganadas,perdidas,partidas, auth) {


  console.log("tratande de modificar usuario hraph");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
    query: "mutation {\r\n  modificarUsuario(nombreUsuario: \""+usuario+"\",ganadas: "+ganadas+",perdidas: "+perdidas+",partidas: "+partidas+") {\r\n    nombreUsuario\r\n    numeroJuegos\r\n    numeroVictorias\r\n    numeroDerrotas\r\n  }\r\n\r\n}",
    variables: {}
    
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };
  
  const response =  await fetch("http://localhost:4000/", requestOptions).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));
 
console.log(response)

  let mensaje;

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
    console.log(response.body.data.modificarUsuario)
    console.log("usuario modificado")
    guardarPartida(SuperState);
    auth.signin(() => console.log("usuario modificado"), "null",response.body.data.modificarUsuario)
  }

}


async function CrearUsuario(usuario,contraseña, auth, history,iniciarSession) {


  console.log("tratande de crear usuario hraph");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
    query: "mutation {\r\n  crearUsuario(nombreUsuario: \""+usuario+"\") {\r\n    nombreUsuario\r\n    numeroJuegos\r\n    numeroVictorias\r\n    numeroDerrotas\r\n  }\r\n\r\n}",
    variables: {}
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };
  
  const response =  await fetch("http://localhost:4000/", requestOptions).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));
 
console.log(response)

  let mensaje;

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
    console.log(response.body.value)
    console.log("usuario creado")
    iniciarSession(usuario, contraseña, auth, history)
  }

}

async function ObtenerUsuario(usuario, auth, history,token) {

  console.log("tratando de obtener Usuario de persistencia  ")
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
    query: "{\r\n  getUser(nombreUsuario: \""+usuario+"\") {\r\n    nombreUsuario\r\n    numeroJuegos\r\n    numeroVictorias\r\n    numeroDerrotas\r\n  }\r\n}",
    variables: {}
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };
  
  const response = await fetch("http://localhost:4000/", requestOptions).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));
 





  if ((600 > response.status) && (response.status > 499)) {//500
    console.log(response)
    console.log("error casual del profe se intentara de nuevo")
    CrearUsuario(usuario,contraseña, auth, history,iniciarSession)
  }
  else if ((500 > response.status) && (response.status > 399)) {//400
    console.log(response)
    console.log("error 400 algo en ObtenerUsuario Persistencia")
  }
  else if ((300 > response.status) && (response.status > 199)) {//300
    console.log(response.body.data.getUser)
    console.log("usuario Obtenido de persistencia")
    auth.signin(() => history.push("/"), token,response.body.data.getUser)
  }
console.log("mala persistencia")
}




 export {CrearUsuario,ObtenerUsuario,ModificarUsuario}