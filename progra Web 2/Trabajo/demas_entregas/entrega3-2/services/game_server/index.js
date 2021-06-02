const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
server.use(bodyParser.json());

server.use(cors());

server.get("/flip", (req, res) => {
  res.json(crearStatePartida());
});

server.post("/flip", (req, res) => {
 // console.log(req.body[0]);
 let x = flip(req.body[1],req.body[0])
// console.log(x)
  res.json(x);
});

server.post("/flipall", (req, res) => {
  // console.log(req.body[0]);
  let x = flipAllCards(req.body)
 // console.log(x)
   res.json(x);
 });



server.listen(process.env.PORT || 8085);


function flip(carta, SuperState ) {

  let newState = { ...SuperState };

  if (SuperState.cartasVolteadas === 0) {

    newState.carta1 = newState.cartas[carta[0]]; newState.carta1 = newState.cartas[carta[0]];
    newState.cartas[carta[0]].flip = !newState.cartas[carta[0]].flip;
    newState.cartasVolteadas++;
    newState.turnos++;


  }
  if (SuperState.cartasVolteadas === 1) {


    newState.carta2 = newState.cartas[carta[0]];
    newState.cartas[carta[0]].flip = !newState.cartas[carta[0]].flip;
    newState.cartasVolteadas++;
    newState.turnos++;

    if (newState.carta1.value === newState.carta2.value) {
      newState.puntos += 1;
      newState.paresRestantes -= 1;
      newState.carta1.find = 1;
      newState.carta2.find = 1;
    }
    else { newState.vidas -= 1; newState.errores++; }




  }
  if (SuperState.cartasVolteadas > 1) {
    console.log(newState.carta1.find)
    if (newState.carta1.find === 0) {
      newState.cartas[newState.carta1.id].flip=false
      newState.cartas[newState.carta2.id].flip=false
      newState.carta1.flip = false;
      newState.carta2.flip = false;
    }
    newState.carta1 = newState.cartas[carta[0]];
    newState.cartas[carta[0]].flip = !newState.cartas[carta[0]].flip;
    newState.cartasVolteadas = 1;
    newState.turnos++;

  }
  if (newState.vidas < 1) {
    
    for (const carta of Object.keys(newState.cartas)) {
      newState.cartas[carta].flip = true
    }


  }
  if (newState.paresRestantes < 1) {

newState.puntos+=newState.vidas;
  }

  
  return newState


};

function flipAllCards(SuperState) {
  let newState = { ...SuperState };

  for (const carta of Object.keys(newState.cartas)) {
    newState.cartas[carta].flip = !newState.cartas[carta].flip
  }

  return newState

}

function crearStatePartida() {

  let jugador 
 
      jugador = ""
  
  ///
  let IdPartida 

      IdPartida = -1
  
  ///
  let cartas 
      cartas = {};
      for (let i = 0; i <= 8; i++) {
          cartas[i] = { id: i, value: i + 1, flip: 1, find: 0 };
      }
      for (let i = 8; i <= 15; i++) {
          cartas[i] = { id: i, value: i - 7, flip: 1, find: 0 };
      }
  
  ///
  let cartasVolteadas

      cartasVolteadas = 0;
  
  ///
  let turnos 

      turnos = -1;
  
  ///
  let errores 

      errores = 0;
  
  ///
  let puntos 

      puntos = 0;
  
  ///
  ///
  let carta1;

      carta1 = null;
  
  ///
  ///
  let carta2 

      carta2 = null;
  
  ///
  ///
  let vidas 
  
      vidas = 10;
  
  ///
  let cartasRamdon 

      cartasRamdon = shuffle(Object.entries(JSON.parse(JSON.stringify(cartas))))
  
  ///
  let paresRestantes

      paresRestantes = cartasRamdon.length / 2;
  
  ///

  const partida ={
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

  return partida

}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}