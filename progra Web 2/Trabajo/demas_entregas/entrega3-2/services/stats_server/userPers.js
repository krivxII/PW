import fetch from 'node-fetch'

const url = 'https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development'
const appId = '9990638a-a986-442f-b029-feb40bd4d4kh'


async function CrearUsuario(usuarioName) {
 
    console.log("tratando de crear usuario")
    const response = await fetch(`${url}/pairs/U-${usuarioName}`, {
      method: 'PUT',
      headers: {
        'x-application-id': appId,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "nombreUsuario": usuarioName, "numeroJuegos": 0, "numeroVictorias": 0, "numeroDerrotas": 0 }),
    }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));


    if ((600 > response.status) && (response.status > 499)) {//500
      console.log(response)
      console.log("error casual del profe se intentara de nuevo EN CREAR USUARIO")
      return await CrearUsuario(usuarioName)
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
      console.log(response)
      console.log("error 400 algo EN CREAR USUARIO")
      return (0)
    }
    else if ((300 > response.status) && (response.status > 199)) {//300
      console.log(response.body.value)
      console.log("usuario Creado")
      return (JSON.parse(response.body.value))
    }
    return (0)
  }

  async function  ModificarUsuario(usuario,victorias,derrotas,partidas) {
 
    console.log("tratando de Modificar usuario")
    const response = await fetch(`${url}/pairs/U-${usuario}`, {
      method: 'PUT',
      headers: {
        'x-application-id': appId,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "nombreUsuario": usuario, "numeroJuegos": partidas, "numeroVictorias": victorias, "numeroDerrotas": derrotas }),
    }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));


    if ((600 > response.status) && (response.status > 499)) {//500
      console.log(response)
      console.log("error casual del profe se intentara de nuevo EN Modificar USUARIO")
      return await ModificarUsuario(usuario)
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
      console.log(response)
      console.log("error 400 algo EN MODIFICAR USUARIO")
      return (0)
    }
    else if ((300 > response.status) && (response.status > 199)) {//300
      console.log(response.body.value)
      console.log("usuario modificado")
      return (JSON.parse(response.body.value))
    }
    return (0)
  }


  async function obtenerUsuario(usuarioName) {
    console.log("tratando de obtener usuario")

    
    const response = await fetch(`${url}/pairs/U-${usuarioName}`, {
      method: 'GET',
      headers: {
        'x-application-id': appId,
        "Content-Type": "application/json"
      },
    }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));

    


    if ((600 > response.status) && (response.status > 499)) {//500
      console.log(response)
      console.log("error casual del profe se intentara de nuevo en obtener usuario")
      return await obtenerUsuario(usuarioName)
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
      console.log(response)
      console.log("error 400 algo en obtener usuario")
      return (0)
    }
    else if ((300 > response.status) && (response.status > 199)) {//300
      console.log(response.body.value)
      console.log("usuario obtenido ")
      return (response.body.value)
    }
    return (0)
  }
  
  async function obtenerUsuarios() {///listo
    console.log("tratando de obtener usuarios")


    const response = await fetch(`${url}/collections/U-`, {
      method: 'GET',
      headers: {
        'x-application-id': appId,
        "Content-Type": "application/json"
      },
    });

    const text = await response.json();

    

    if ((600 > response.status) && (response.status > 499)) {//500
      console.log(response)
      console.log("error casual del profe se intentara de nuevo en obtener usuario")
      return await  obtenerUsuarios()
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
      console.log(response)
      console.log("error 400 algo en obtener usuario")
      return (0)
    }
    else if ((300 > response.status) && (response.status > 199)) {//300
      console.log("usuarios super obtenido ")
      console.log()
      return (text.map(x =>JSON.parse(x.value)))
    }
    return (0)
  }
  

  export { CrearUsuario, obtenerUsuario, ModificarUsuario, obtenerUsuarios }
