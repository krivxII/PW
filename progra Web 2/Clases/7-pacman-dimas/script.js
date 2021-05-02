const { Stream } = window;


//Representación del juego mediante números en una matriz
let gameData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 2, 2, 1, 1, 5, 1, 1, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//Indica qué representa cada número
const WALL = 1;
const COIN = 2;
const GROUND = 3;
const PACMAN = 5;


//Mapa del juego
let map;

//Posición de pacman en el mapa y dirección a la que mira
let pacman = {
    x: 6,
    y: 4,
    direction: 'right'
};



// Convierte los datos del juego a elementos del DOM
function createTiles(data) {

    // Se  mantienen los datos del DOM en un array
    let tilesArray = [];

    for (let row of data) {
        for (let col of row) {
            // Se crea cada recuadro del juego como un div
            let tile = document.createElement('div');

            // Se asigna a cada recuadro el nombre de la clase tile
            tile.classList.add('tile');

            //Dependiendo del valor que tiene el recuadro se le asigna
            //un nombre de clase más concreto
            if (col === WALL) {
                tile.classList.add('wall');

            } else if (col === COIN) {
                tile.classList.add('coin');

            } else if (col === GROUND) {
                tile.classList.add('ground');

            } else if (col === PACMAN) {
                tile.classList.add('pacman');

                //Pacman también tiene la clase direction para saber a dónde mira
                tile.classList.add(pacman.direction);

            }

            // Se añade cada recuadro al array
            tilesArray.push(tile);
        }

        //Al final de cada fila se indica un br para que el navegador
        //haga un line break en la página
        let brTile = document.createElement('br');
        tilesArray.push(brTile);
    }

    //Retorno el array con los recuadros configurados
    return tilesArray;
}

//Se rellena un mapa con los recuadros configurados 
//y los carga en la página
function drawMap() {
    map = document.createElement('div');

    let tiles = createTiles(gameData);
    for (let tile of tiles) {
        map.appendChild(tile);
    }

    document.body.appendChild(map);
}

//Borra el mapa de la página
function eraseMap() {
    document.body.removeChild(map);
}

//Dibuja el mapa por primera vez
drawMap();



const keyDowns = new Stream(next => {
    document.addEventListener("keydown", next);
});

const LEFT = -1;
const RIGHT = 1;
const UP = -1;
const DOWN = 1;

const isLeft = event => "ArrowLeft" === event.code;
const isRight = event => "ArrowRight" === event.code;
const isUp = event => "ArrowUp" === event.code;
const isDown = event => "ArrowDown" === event.code;

const leftKeyDowns = keyDowns.filter(isLeft).map(() => LEFT);
const rightKeyDowns = keyDowns.filter(isRight).map(() => RIGHT);

const upKeyDowns = keyDowns.filter(isUp).map(() => UP);
const downKeyDowns = keyDowns.filter(isDown).map(() => DOWN);

const xMovements = Stream.merge(leftKeyDowns, rightKeyDowns);
const yMovements = Stream.merge(upKeyDowns, downKeyDowns);

const initVertical = Stream.of(pacman.y);
const initHorizontal = Stream.of(pacman.x);

const velocity = 1;

//Movimiento vertical
const yIncrement = yMovements.map(direction => direction * velocity);
const yPos = Stream.merge(initVertical, yIncrement).scan((currentPos, increment) => {
    const newPos = currentPos + increment;
    //Devuelvo la posicion nueva si no hay muro o la actual si hay muro
    if (gameData[newPos][pacman.x] !== WALL) {
        if (newPos > currentPos) {
            pacman.direction = 'down';
        } else {
            pacman.direction = 'up';
        }
        return newPos;
    } else {
        return currentPos;
    }
}, 0);

//Movimiento horizontal
const xIncrement = xMovements.map(direction => direction * velocity);
const xPos = Stream.merge(initHorizontal, xIncrement).scan((currentPos, increment) => {
    const newPos = currentPos + increment;
    //Devuelvo la posicion nueva si no hay muro o la actual si hay muro
    if (gameData[pacman.y][newPos] !== WALL) {
        if (newPos > currentPos) {
            pacman.direction = 'right';
        } else {
            pacman.direction = 'left';
        }
        return newPos;
    } else {
        return currentPos;
    }
}, 0);


//Movimiento en eje y
yPos.subscribe(data => {
    //pacman.direction = data.pacmanDirection;
    gameData[pacman.y][pacman.x] = GROUND;
    pacman.y = data;
    gameData[pacman.y][pacman.x] = PACMAN;

    //Comunicación con el servidor, devuelve true o false
    const pacmaned = fetch("https://pacman-di-express.glitch.me/");
    pacmaned.then(res => res.json()).then(isPacman => {
        console.log(isPacman);
    }).catch(error => window.alert(error));

    eraseMap();
    drawMap();
});

//Movimiento en eje x
xPos.subscribe(data => {
    //pacman.direction = data.pacmanDirection;

    gameData[pacman.y][pacman.x] = GROUND;
    pacman.x = data;
    gameData[pacman.y][pacman.x] = PACMAN;

    //Comunicación con el servidor, devuelve true o false
    const pacmaned = fetch("https://pacman-di-express.glitch.me/");
    pacmaned.then(res => res.json()).then(isPacman => {
        console.log(isPacman);
    }).catch(error => window.alert(error));


    eraseMap();
    drawMap();
});
