const appId="2710638a-a986-442f-b029-feb40bd4d4dd";


async function guardarPartida(Props) {
  console.log("tratande de crear Partida Graph");
  
  let vara= btoa(JSON.stringify(Props))
  console.log(vara)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
    query: `mutation{\r\n  crearPartida(partida:\"${vara}\" ) {\r\n    partida \r\n  }\r\n}`,
    variables: {}
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };
  
  fetch("http://localhost:4000/", requestOptions)















  var graphql = JSON.stringify({
      query: "mutation{\r\n  crearPartida(partida:\""+vara+"\" ) {\r\n    partida \r\n  }\r\n}",
    variables: {}
  }) 
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };
  
  const response =  await  fetch("http://localhost:4000/", requestOptions)
  
  

  
 
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
    console.log("partida creada")
    
  }

}


 export {guardarPartida}