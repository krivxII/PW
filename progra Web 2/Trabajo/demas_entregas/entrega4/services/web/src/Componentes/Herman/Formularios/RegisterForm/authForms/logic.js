import { toast } from 'react-toastify';
import {CrearUsuario,ObtenerUsuario} from "../../../Persistencia/persistenciaUsuario"
const ruta = process.env.K_SERVER_URL || "http://localhost:8083";


const toastOpt = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}



async function iniciarSession(usuario, contraseña, auth, history) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"username":usuario,"password":contraseña});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const response =  await fetch(ruta+"/iniciarSession", requestOptions).then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));
    
    
    
    
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

async function destruirToken() {
    console.log("tratanto de destruir token")

    const token = localStorage.getItem('juegoToken');
   

    if (!(token === null)) {
        console.log("destruyendo token")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: token,
            redirect: 'follow'
        };

        const response = await fetch(`ruta/destruirToken`, requestOptions)
            .then(res =>  {return {ok: res.ok, status: res.status} } );

        let mensaje;
        ///////////////////////////////////////////////////////////////////
         if ((600 > response.status) && (response.status > 499)) {//500
            mensaje = `tratando de destruir token de nuevo`
            toast.dark(mensaje, toastOpt);
            destruirToken();
        }////////////////////////////////////////////////////////////
        else if ((500 > response.status) && (response.status > 399)) {//400

            mensaje = `Error: ${response.status}
            -------------------------------
            Mensaje: ${response.body}
            Info: se trato de fallidamente de invalidar el token y se borrara`;
            toast.dark(mensaje, toastOpt);
            localStorage.removeItem('juegoToken')

        }//////////////////////////////////////////////////////
        else if ((300 > response.status) && (response.status > 199)) {//200
            mensaje = `token destruido`
            localStorage.removeItem('juegoToken')
            toast.dark(mensaje, toastOpt);
            console.log("token destruido e invalidado")
        }
    }else console.log("no hay token en la base de datos")
}

async function registrar(nombre, usuario, contraseña, auth, history) {
    console.log("tratando de registrar un usuario nuevo en el sistema de authV2 ")

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"username":usuario,"firstName":nombre,"password":contraseña});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const response = await fetch(ruta+"/registrarUsuario", requestOptions)
.then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));




     
        

    let mensaje;

     if ((600 > response.status) && (response.status > 499)) {//500
        mensaje = `Error: ${response.status}
        -------------------------------
        Mensaje: ${response.body.details}`

        toast.dark(mensaje, toastOpt);
        registrar(nombre, usuario, contraseña, auth, history)
    }
    else if ((500 > response.status) && (response.status > 399)) {//400
        mensaje = `Error: ${response.status}
          -------------------------------
          Mensaje: ${response.body.details}`;
        toast.dark(mensaje, toastOpt);
    }
    else if ((300 > response.status) && (response.status > 199)) {//300
        mensaje = `Code: ${response.status}
          -------------------------------
          Bienvenido: ${response.body.firstName}
          -------------------------------
          Usuario ${response.body.username} creado `
        toast.dark(mensaje, toastOpt);
        response.body.token
        auth.signin(() => history.push("/"), response.body.token,response.body.usuario)
      
    }



}
export { registrar, iniciarSession, validarToken, destruirToken };






async function validarToken(auth, history) {

    console.log("tratando de validar token")
    const token = localStorage.getItem('juegoToken');
console.log(token)

    if (!(token === null)) {
        var myHeaders = new Headers();
        console.log(token)
        myHeaders.append("Authorization", token);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: token,
            redirect: 'follow'
        };
        
        const response = await fetch(ruta+"/validarToken", requestOptions)
            .then(res => res.json().then(data => ({ ok: res.ok, status: res.status, body: data })));


        let mensaje;
         if ((600 > response.status) && (response.status > 499)) {//500
            mensaje = `Error: ${response.status}
            -------------------------------
            Mensaje: ${response.body.details}`;
            console.log("error del profe, tratando de nuevo en validar")

            toast.dark(mensaje, toastOpt);
            validarToken(auth, history)
        }
        else if ((500 > response.status) && (response.status > 399)) {//400

            mensaje = `Error: ${response.status}
            -------------------------------
            Mensaje: ${response.body.details}`;

            console.log("el token no fue validado sera destruido en validar")
            localStorage.removeItem('juegoToken')
            toast.dark(mensaje, toastOpt);


        }
        else if ((300 > response.status) && (response.status > 199)) {//200
            mensaje = `Code: ${response.status}
      -------------------------------
      TokenValidado: ${token}
      -------------------------------
      `;
      console.log("el token  fue validado en vaidarr") 
      console.log(response.body) 
    
      auth.signin(() => history.push("/"), response.body.token,response.body.usuario)

            toast.dark(mensaje, toastOpt);
        }
    }else console.log("no hay token en la  base de datos 2")
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
