import React from "react";
import Card from "../../Carta/Card.jsx"
//const e_server = process.env.E_SERVER_URL || "http://localhost:8085" 
const e_server = "http://localhost:8085" 
async function crearStatePartida(nombre,id,setSuperState) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
     
    const response = await  fetch(e_server+"/flip", requestOptions)
    const text = await response.json();  

    const partida = text;
    partida.jugador=nombre;partida.IdPartida=id;
      console.log(partida)
      console.log("-----------------------------------------------")
      setSuperState(partida)

}

function newPartida(props) {

    let jugador = props.jugador;
 
    let IdPartida = props.IdPartida+1;

    let cartasVolteadas = 0;
  

        let cartas = {};
        for (let i = 0; i <= 8; i++) {
            cartas[i] = { id: i, value: i + 1, flip: 1, find: 0 };
        }
        for (let i = 8; i <= 15; i++) {
            cartas[i] = { id: i, value: i - 7, flip: 1, find: 0 };
        }
    
    ///


       let turnos = -1;
    
    ///

      let  errores = 0;
    
    ///

       let puntos = 0;
    
    ///
    ///

      let carta1 = null;
    
    ///
    ///
 
      let  carta2 = null;
    
    ///
    ///

      let  vidas = 10;
    
    ///

     let   cartasRamdon = shuffle(Object.entries(JSON.parse(JSON.stringify(cartas))))
    
    ///

      let  paresRestantes = cartasRamdon.length / 2;
    
    ///
    
    return {
        jugador,
        IdPartida,
        vidas,
        paresRestantes,
        cartas,
        cartasVolteadas,
        cartasRamdon,
        turnos,
        errores,
        puntos,
        carta1,
        carta2,
    }


 
}

function crearTablaEstadisticas(SuperState) {
    console.log(SuperState)
    if (typeof SuperState==="undefined") return "null"
    const element = (
        <table >
            <tbody>
                <tr>
                    <td>
                        Jugador: {SuperState.jugador}
                    </td>
                    <td>
                        Turno: {SuperState.turnos}
                    </td>
                    <td>
                        Errores: {SuperState.errores}
                    </td>
                    <td>
                        Puntos: {SuperState.puntos}
                    </td>
                    <td>
                        vidas: {SuperState.vidas}
                    </td>
                    <td>
                        Pares restantes: {SuperState.paresRestantes}
                    </td>
                    <td>
                        Partida: {SuperState.IdPartida}
                    </td>
                </tr>
            </tbody>
        </table>
    );
    return element
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function crearCartas(SuperState, flip, setSuperState) {
    if (typeof SuperState==="undefined") return "null"


    return (

        
      
        SuperState.cartasRamdon
            .map((carta, i) => {

                return (<Card
                    key={i}
                    carta={carta}
                    flip={flip}
                    SuperState={SuperState}
                    setSuperState={setSuperState}
                >
                </Card>)

            }
                //   <button key={i} onClick={() => { flip(carta,SuperState,setSuperState) }}>{carta[0]}</button>    
            )
         
    
    )
}

 

export { crearStatePartida, crearTablaEstadisticas, crearCartas, newPartida }