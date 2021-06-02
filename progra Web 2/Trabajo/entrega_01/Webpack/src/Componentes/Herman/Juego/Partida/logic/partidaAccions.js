function flip(carta, SuperState, setSuperState, openModal) {

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

    if (newState.carta1.find === 0) {
      newState.carta1.flip = false;
      newState.carta2.flip = false;
    }
    newState.carta1 = newState.cartas[carta[0]]; newState.carta1 = newState.cartas[carta[0]];
    newState.cartas[carta[0]].flip = !newState.cartas[carta[0]].flip;
    newState.cartasVolteadas = 1;
    newState.turnos++;

  }
  if (newState.vidas < 1) {
    openModal()
    
    for (const carta of Object.keys(newState.cartas)) {
      newState.cartas[carta].flip = true
    }
  }
  if (newState.paresRestantes < 1) {
    openModal()
  }

  
  setSuperState(newState)


};


function flipAllCards(SuperState, setSupertate) {
  let newState = { ...SuperState };

  for (const carta of Object.keys(newState.cartas)) {
    newState.cartas[carta].flip = !newState.cartas[carta].flip
  }

  setSupertate(newState)

}


export { flip, flipAllCards }