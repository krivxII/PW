const K_server =  process.env.K_SERVER_URL ||"http://localhost:8084"
async function guardarPartida(Props) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  let vara= btoa(JSON.stringify(Props))
  var raw = JSON.stringify({"partida":vara});
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  const response = await fetch(K_server+"/guardarPartida", requestOptions)
  


  console.log("tratande de crear Partida Graph");
  
  console.log(vara)
  
console.log(response)

  if ((600 > response.status) && (response.status > 499)) {//500
    console.log(response)
    console.log("error casual del profe se intentara de nuevo")
    guardarPartida(Props)
  }
  else if ((500 > response.status) && (response.status > 399)) {//400
    console.log(response)
    console.log("error 400 algo")
  }
  else if ((300 > response.status) && (response.status > 199)) {//300
    console.log(response.body.value)
    console.log("partida guarda")
    return {status:"ok"}
    
  }

}


 export {guardarPartida}