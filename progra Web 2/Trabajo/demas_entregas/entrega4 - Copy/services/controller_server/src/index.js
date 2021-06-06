const Koa = require("koa");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const Router = require("@koa/router");
const fetch = require('node-fetch');

const app = new Koa();
const router = new Router();

console.log("-------------------")
console.log(process.env.G_SERVER_URL); console.log(process.env.E_SERVER_URL)
console.log("-------------------")
const G_ruta= process.env.G_SERVER_URL || "http://localhost:4000/";
const E_ruta= process.env.E_SERVER_URL || "http://localhost:8085"

console.log("-------------------")
console.log(G_ruta); console.log(E_ruta)
console.log("-------------------")


router.post("/tehe", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("--------------------")
console.log(ctx.request.body)
console.log()
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify({te:"he"});
});

router.post("/registrarUsuario", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("--------------------")


  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(await registrarUsuario(ctx.request.body));
});

router.post("/iniciarSession", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("--------------------")

  console.log("im here x2")
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(await iniciarSession(ctx.request.body.username,ctx.request.body.password));
});
router.post("/flip", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("--------------------")
  
  console.log("fliper")
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(await flip(ctx.request.body[1],ctx.request.body[0]));
});

router.post("/flipAll", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("--------------------")
  console.log(ctx.request.body)
  console.log("fliper all")
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(await flipAllCards(ctx.request.body));
});

router.post("/validarToken", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("--------------------")
  console.log(ctx.request.body)
 
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(await validarToken(ctx.request.body));
});

router.post("/destruirToken", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("--------------------")
  console.log(ctx.request.body)
 
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(await destruirToken(ctx.request.body));
});

router.post("/obtenerUsuario", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("--------------------")
  console.log("obteniendo Usuario")
  console.log(ctx.request.body)
 
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(await ObtenerUsuario(ctx.request.body,"nono"));
});

router.post("/modificarUsuario", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("-----------tratando de modificar usuario---------")
  console.log(ctx.request.body)
 
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(await ModificarUsuario(ctx.request.body));
});


router.post("/guardarPartida", async(ctx) => {
  // 1. post mutation to Stats server to store new game
  // 2. return state
  console.log("---------guardando partida-----------")

 
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(await guardarPartida(ctx.request.body));
});


app.use(koaBody());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT||8083);


async function registrarUsuario(registro) {
  ///username, firstName, password
  console.log(registro)
  let usuario = registro.username
  let nombre=registro.firstName
  let contraseña=registro.password
  console.log("tratando de registrar un usuario nuevo en el sistema de auth ")
 
  let headers= {
    "Content-Type": "application/json"
  }

  var raw = JSON.stringify({
      "firstName": nombre,
      "password": contraseña
  });

  var requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
  };

  const response = await fetch(`https://6fra5t373m.execute-api.eu-west-1.amazonaws.com/development/users/${usuario}`, requestOptions)
      .then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));


   if ((600 > response.status) && (response.status > 499)) {//500
    console.log("error 500 en registrarUsuario")
      return await registrarUsuario(registro)
  }
  else if ((500 > response.status) && (response.status > 399)) {//400
          console.log("error 400 en registrarUsuario")
          console.log(response)
    return{error: "error 400 en registrarUsuario"}
  }
  else if ((300 > response.status) && (response.status > 199)) {//300

    console.log("se registro al usuario")
      return await  CrearUsuario(usuario,contraseña)
    
  }



}

async function CrearUsuario(usuario,contraseña) {

  console.log("tratande de crear usuario hraph");
  var graphql = JSON.stringify({
    query: "mutation {\r\n  crearUsuario(nombreUsuario: \""+usuario+"\") {\r\n    nombreUsuario\r\n    numeroJuegos\r\n    numeroVictorias\r\n    numeroDerrotas\r\n  }\r\n\r\n}",
    variables: {}
  })

  const response = await fetch(G_ruta, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: graphql,
  }).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));
 


 

  

  

console.log(response)

  let mensaje;

  if ((600 > response.status) && (response.status > 499)) {//500
    console.log(response)
    console.log("error casual del profe se intentara de nuevo")
    return await CrearUsuario(usuario,contraseña)
  }
  else if ((500 > response.status) && (response.status > 399)) {//400
    console.log(response)
    console.log("error 400 algo")
    return "error"
  }
  else if ((300 > response.status) && (response.status > 199)) {//300
    console.log(response.body.value)
    console.log("usuario creado")
    return await  iniciarSession(usuario, contraseña)
  }

}

async function iniciarSession(usuario, contraseña ) {

  console.log("tambien paso por aca")

  let headers= {
    "Content-Type": "application/json"
  }
  var raw = JSON.stringify({
      "password": contraseña
  });
  var requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
  };
  const response = await fetch(`https://6fra5t373m.execute-api.eu-west-1.amazonaws.com/development/users/${usuario}/sessions`, requestOptions)
      .then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));




  let mensaje;
  if ((500 > response.status) && (response.status > 399)) {
     
return {error:"error 400 en iniciar session"}
      
  }
  else if ((600 > response.status) && (response.status > 499)) {
      
 

   return await  iniciarSession(usuario, contraseña)

  }
  else if ((300 > response.status) && (response.status > 199)) {

    console.log("y aca")
    console.log(usuario)
     return await ObtenerUsuario(usuario,response.body.sessionToken)
    
      
  }


}

async function ObtenerUsuario(usuario,token="nono") {


  
  console.log("tratando de obtener Usuario de persistencia 22 ")
  console.log(G_ruta)
  let headers= {
    "Content-Type": "application/json"
  }
  
  var graphql = JSON.stringify({
    query: "{\r\n  getUser(nombreUsuario: \""+usuario+"\") {\r\n    nombreUsuario\r\n    numeroJuegos\r\n    numeroVictorias\r\n    numeroDerrotas\r\n  }\r\n}",
    variables: {}
  })
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: graphql,
    redirect: 'follow'
  };
  
  const response = await fetch(G_ruta, requestOptions).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));
 





  if ((600 > response.status) && (response.status > 499)) {//500
    console.log(response)
    console.log("error casual del profe se intentara de nuevo")
  return await  CrearUsuario(usuario,contraseña, auth, history,iniciarSession)
  }
  else if ((500 > response.status) && (response.status > 399)) {//400
    console.log(response)
    console.log("error 400 algo en ObtenerUsuario Persistencia")
  }
  else if ((300 > response.status) && (response.status > 199)) {//300
    console.log(response.body.data.getUser)
    console.log("usuario Obtenido de persistencia")
    if (token === "nono") return { usuario: {...response.body.data.getUser}}
    return{ usuario: {...response.body.data.getUser}, token:token }

  }
console.log("mala persistencia")
}

async function flip(carta, SuperState) {


  let headers= {
    "Content-Type": "application/json"
  }
  var raw = JSON.stringify([SuperState,carta]);
  var requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
  };
  const response = await fetch(E_ruta+"/flip", requestOptions)
  const newState = await response.json();  

 
  
 
  


 


 if ((600 > response.status) && (response.status > 499)) {//500

  console.log("error casual del profe se intentara de nuevo")
  
}
else if ((500 > response.status) && (response.status > 399)) {//400

  console.log("error 400 algo")
}
else if ((300 > response.status) && (response.status > 199)) {//300
  console.log("fasfasfas")


   return newState;
}
 
};


async function flipAllCards(SuperState, setSupertate) {
  let headers= {
    "Content-Type": "application/json"
  }
  
  var raw = JSON.stringify(SuperState);
  
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow'
  };
  
 const response = await fetch(E_ruta+"/flipall", requestOptions)
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
return text;
} 

}

async function validarToken(token) {

  console.log("tratando de validar token")

  console.log(token)


  if (!(token === null)) {
    let headers= {
      "Authorization": token
    }
    
      var requestOptions = {
          method: 'GET',
          headers: headers,
          redirect: 'follow'
      };
      const response = await fetch("https://6fra5t373m.execute-api.eu-west-1.amazonaws.com/development/user", requestOptions)
          .then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));


      let mensaje;
       if ((600 > response.status) && (response.status > 499)) {//500
     
          validarToken(token)
      }
      else if ((500 > response.status) && (response.status > 399)) {//400



          console.log("el token no fue validado sera destruido en validar")
          
         return {"error": "token no validado"}


      }
      else if ((300 > response.status) && (response.status > 199)) {//200

    console.log("el token  fue validado en vaidarr") 
    console.log(response.body.username) 
    return  await ObtenerUsuario(response.body.username,token)

        
      }
  }
}

async function destruirToken(token) {
  console.log("tratanto de destruir token")

 
 

  if (!(token === null)) {
      console.log("destruyendo token")
      let headers= {
        "Authorization": token
      }
      
      var requestOptions = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow'
    };

      const response = await fetch(`https://6fra5t373m.execute-api.eu-west-1.amazonaws.com/development/sessions/${token}`, requestOptions)
          .then(res =>  {return {ok: res.ok, status: res.status} } );

      let mensaje;
      ///////////////////////////////////////////////////////////////////
       if ((600 > response.status) && (response.status > 499)) {//500
          mensaje = `tratando de destruir token de nuevo`
        ;
          destruirToken();
      }////////////////////////////////////////////////////////////
      else if ((500 > response.status) && (response.status > 399)) {//400

         
          return {error:"error"}

      }//////////////////////////////////////////////////////
      else if ((300 > response.status) && (response.status > 199)) {//200
        console.log("token destruido e invalidado")
        return {ok:"ok"}
      }
  }else console.log("no hay token en la base de datos")
}



async function guardarPartida(Props) {
    console.log("tratado de guardar partida");
    
  


    let vara= Props
    let myHeaders= {
      "Content-Type": "application/json"
    }

   
  
  
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
    
    const response =  await  fetch(G_ruta, requestOptions)
    
    
  
    
   
 // console.log(response)
  
    let mensaje;
  
    if ((600 > response.status) && (response.status > 499)) {//500
     // console.log(response)
      console.log("error casual del profe se intentara de nuevo")
      CrearUsuario(usuario,contraseña, auth, history,iniciarSession)
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
     // console.log(response)
      console.log("error 400 algo")
    }
    else if ((300 > response.status) && (response.status > 199)) {//300
     // console.log(response.body.value)
      console.log("partida creada")
      
    }
  
  }
  


  async function ModificarUsuario(props) {

    

  console.log("tratande de modificar usuario hraph");
 
  let headers= {
    "Content-Type": "application/json"
  }

  
  var graphql = JSON.stringify({
    query: "mutation {\r\n  modificarUsuario(nombreUsuario: \""+props.usuario+"\",ganadas: "+props.ganadas+",perdidas: "+props.perdidas+",partidas: "+props.partidas+") {\r\n    nombreUsuario\r\n    numeroJuegos\r\n    numeroVictorias\r\n    numeroDerrotas\r\n  }\r\n\r\n}",
    variables: {}
    
  })
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: graphql,
    redirect: 'follow'
  };
  
  
  const response =  await fetch(G_ruta, requestOptions) 
console.log(response)

  let mensaje;

  if ((600 > response.status) && (response.status > 499)) {//500
    console.log(response)
    console.log("error casual del profe se intentara de nuevo")
   return await ModificarUsuario(nombre,ganadas,perdidas,partidas)
  }
  else if ((500 > response.status) && (response.status > 399)) {//400
    console.log(response)
    console.log("error 400 algo")
  }
  else if ((300 > response.status) && (response.status > 199)) {//300
    console.log(response.body)
    return await ObtenerUsuario(props.usuario,"nono")
    
  }
    
    }