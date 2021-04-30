const root = document.querySelector(".js-root");

const cuantasBombasTieneAlrededor = casilla => {
  const index = Number(casilla.getAttribute("data-index"));
  const indicesContiguos = [
    index - 21,
    index - 20,
    index - 19,
    index - 1,
    index + 1,
    index + 19,
    index + 20,
    index + 21
  ];

  return indicesContiguos
    .map(indice => document.querySelector(`[data-index="${indice}"]`))
    .filter(elemento => elemento != null)
    .map(casilla => casilla.getAttribute("data-tipo"))
    .map(tipo => (tipo === "mina" ? 1 : 0))
    .reduce((a, b) => a + b, 0);
};

const handleClick = event => {  
  const casilla = event.target;
  const tipo = casilla.getAttribute("data-tipo");

  if (tipo === "mina") {
    casilla.classList.add("mina");
    window.alert("fin de partida");
  } else if (tipo === "vacia") {
    casilla.classList.add("vacia");
    const numeroDeBombas = cuantasBombasTieneAlrededor(casilla);
    casilla.classList.add(`vacia-${numeroDeBombas}`);
  } else {
    throw new Error(`caso inválido: ${tipo}`);
  }
};

const popularCuadricula = () => {
  // TODO: limpiar cuadrícula.

  for (let i = 0; i < 400; ++i) {
    const casilla = document.createElement("div");
    casilla.classList.add("casilla");
    casilla.setAttribute("data-index", i);
    casilla.setAttribute("data-tipo", Math.random() > 0.75 ? "mina" : "vacia");
    casilla.addEventListener("click", handleClick);
    root.appendChild(casilla);
  }
};
popularCuadricula();

// .getAttribute('data-index');
//  const casilla = document.querySelector(`[data-index="${index}"]`);
