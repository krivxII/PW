import fetch from 'node-fetch'

const url = 'https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development'
const appId = '9990638a-a986-442f-b029-feb40bd4d4kh'

async function crearPartida(partida){
    //Partida es un string 
    let partida2 = JSON.parse(partida)
    console.log("tratando de crear partida")
    const response = await fetch(`${url}/pairs/P-${partida2.jugador}:${partida2.IdPartida}`, {
      method: 'PUT',
      headers: {
        'x-application-id': appId,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(partida2),
    }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));


    if ((600 > response.status) && (response.status > 499)) {//500
      console.log(response)
      console.log("error casual del profe se intentara de nuevo EN CREAR Partida")
      return await crearPartida(partida)
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
      console.log(response)
      console.log("error 400 algo EN CREAR Partida")
      return (0)
    }
    else if ((300 > response.status) && (response.status > 199)) {//300
      console.log(response.body.value)
      console.log("partida Creada")
      return (response.body.value)
    }
    return (0)

}

async function obtenerPartida(idPartida,jugador) {
    console.log("tratando de obtener partida")


    const response = await fetch(`${url}/pairs/P-${jugador}:${idPartida}`, {
      method: 'GET',
      headers: {
        'x-application-id': appId,
        "Content-Type": "application/json"
      },
    }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));


    if ((600 > response.status) && (response.status > 499)) {//500
      console.log(response)
      console.log("error casual del profe se intentara de nuevo en obtener partida")
      return await obtenerPartida(idPartida,jugador)
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
      console.log(response)
      console.log("error 400 algo en obtener partida")
      return (0)
    }
    else if ((300 > response.status) && (response.status > 199)) {//300
      console.log(response.body.value)
      console.log("partida obtenida")
      return (response.body.value)
    }
    return (0)
  }

  async function obtenerPartidas(jugador) {
    console.log("tratando de obtener partidas")


    const response = await fetch(`${url}/collections/P-${jugador}:`, {
      method: 'GET',
      headers: {
        'x-application-id': appId,
        "Content-Type": "application/json"
      },
    })


    const text = await response.json();


    if ((600 > response.status) && (response.status > 499)) {//500
      console.log(response)
      console.log("error casual del profe se intentara de nuevo en obtener partida")
      return await obtenerPartidas(jugador)
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
      console.log(response)
      console.log("error 400 algo en obtener partida")
      return (0)
    }
    else if ((300 > response.status) && (response.status > 199)) {//300
   
      console.log("partidas obtenida")
      console.log(text.map(x => x.value))
      return (text.map(x => {return {"partida": x.value}}))
    }
    return (0)
  }

  export {crearPartida,obtenerPartida,obtenerPartidas}