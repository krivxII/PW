import React from "react";
import Card from "../../Carta/Card.jsx"

function crearStatePartida(props) {

    let jugador = props.jugador;
    if (typeof props.n1 === 'undefined') {
        jugador = "jugador estandar"
    }
    ///
    let IdPartida = props.IdPartida;
    if (typeof props.IdPartida === 'undefined') {
        IdPartida = -1
    }
    ///
    let cartas = props.cartas;
    if (typeof props.cartas === 'undefined') {
        cartas = {};
        for (let i = 0; i <= 8; i++) {
            cartas[i] = { id: i, value: i + 1, flip: 1, find: 0 };
        }
        for (let i = 8; i <= 15; i++) {
            cartas[i] = { id: i, value: i - 7, flip: 1, find: 0 };
        }
    }
    ///
    let cartasVolteadas = props.cartasVolteadas;
    if (typeof props.cartasVolteadas === 'undefined') {
        cartasVolteadas = 0;
    }
    ///
    let turnos = props.turnos;
    if (typeof props.turnos === 'undefined') {
        turnos = -1;
    }
    ///
    let errores = props.errores;
    if (typeof props.errores === 'undefined') {
        errores = 0;
    }
    ///
    let puntos = props.puntos;
    if (typeof props.puntos === 'undefined') {
        puntos = 0;
    }
    ///
    ///
    let carta1 = props.carta1;
    if (typeof props.puncarta1tos === 'undefined') {
        carta1 = null;
    }
    ///
    ///
    let carta2 = props.carta2;
    if (typeof props.carta2 === 'undefined') {
        carta2 = null;
    }
    ///
    ///
    let vidas = props.vidas;
    if (typeof props.vidas === 'undefined') {
        vidas = 10;
    }
    ///
    let cartasRamdon = props.cartasRamdon;
    if (typeof props.cartasRamdon === 'undefined') {
        cartasRamdon = shuffle(Object.entries(JSON.parse(JSON.stringify(cartas))))
    }
    ///
    let paresRestantes = props.paresRestantes;
    if (typeof props.paresRestantes === 'undefined') {
        paresRestantes = cartasRamdon.length / 2;
    }
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


    return 
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