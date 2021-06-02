import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { crearStatePartida, crearTablaEstadisticas, crearCartas,newPartida } from "./logic/partidaGenerator.jsx"
import { flip, flipAllCards } from "./logic/partidaAccions"
import "./partida.css"
import Modal from '../modal/Modal.jsx';


function Partida(props) {

  const [SuperState, setSuperState] = useState(crearStatePartida(props));
  const [open, setOpen] = useState(true);
const {cartas,...rest}={SuperState}


useEffect(()=>{
  if(SuperState.turnos===-1){
    onClicFlag++;  
    SuperState.turnos++;
    setTimeout(()=>{flipAllCards(SuperState,setSuperState)}, 3000)
  }
});



  function openModal() {
    
    setOpen(!open);
  };

  ///////////////////////////// on click wrapper 
  let onClicFlag = 0;
  function onClickW(carta, SuperState, setSuperState) {
    console.log(carta)
    if (onClicFlag < 1 && !SuperState.cartas[carta[0]].flip) {
      onClicFlag++;
      flip(carta, SuperState, setSuperState,openModal)
    }

  }
///////////////////////////////////////
  return (
      <div>
        <span className={"contenedor"}>
          {crearTablaEstadisticas(SuperState)}
          <div className={"table"}>
            {crearCartas(SuperState, onClickW, setSuperState)}
          </div>
        </span>
        {SuperState.vidas === 0 ? (<Modal open={open} onClose={openModal} mensaje="perdiste"></Modal>) : null}
        {SuperState.paresRestantes === 0 ? <Modal open={open} onClose={openModal} mensaje="ganaste"></Modal> : null}
        
        <div className={"lebutton"}>
        { ((SuperState.vidas === 0)||(SuperState.paresRestantes === 0)) ? (<button onClick={ () => {  setSuperState(newPartida(SuperState)); onClicFlag++;
        setTimeout(()=>{flipAllCards(SuperState,setSuperState)}, 3000) }}>Nueva partida</button>) : null } 
        </div>

      </div>
  )
}

export default (hot)(module)(Partida);


/*
<button
  onClick={openModal}>
  Open Modal
</button>
///////////////// <button onClick={() => { x++; console.log(x) }}>yeyeyea</button>

const { cartas, cartasRamdon, carta1, carta2, ...rest } = { ...SuperState }
    <span style={{maxWidth: "600px",maxHeight:"409px", display:"inline-block", overflow: "scroll",}}>

          <pre>
            {JSON.stringify(rest, null, 1)}
          </pre>
          <pre>
            {JSON.stringify(carta1, null, 1)}
          </pre>
          <pre>
            {JSON.stringify(carta2, null, 1)}
          </pre>
          <pre>
            {JSON.stringify(cartas, null, 1)}
          </pre>
      </span>





        <span>
          {Object.entries(SuperState.cartas).map((carta, i) => <button key={i} onClick={() => { flip(carta, SuperState, setSuperState) }}>{carta[1].value}</button>)}
        </span>

*/



