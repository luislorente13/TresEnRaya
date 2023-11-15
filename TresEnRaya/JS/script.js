
document.addEventListener('DOMContentLoaded', function () {

    // tablero
    const menu = document.getElementById('menu');
    const tablero = document.getElementById('tablero');

    const jugarBtn = document.getElementById('jugarBtn');
    const estadisticasBtn = document.getElementById('estadisticasBtn');

    // ejecuta la funcion 'iniciarJuego()'
    jugarBtn.addEventListener('click', function () { 
        
        iniciarJuego();
    });

    // iniciarJuego()
    function iniciarJuego() {
        
        tablero.style.display = 'block';

        
    }
});

// casillas
var c1 = document.getElementById("1");
var c2 = document.getElementById("2");
var c3 = document.getElementById("3");
var c4 = document.getElementById("4");
var c5 = document.getElementById("5");
var c6 = document.getElementById("6");
var c7 = document.getElementById("7");
var c8 = document.getElementById("8");
var c9 = document.getElementById("9");

// marcar casillas 
function marcarCasilla(casilla){
    if (casilla.textContent === "") {
        casilla.innerHTML = "X";
        marcaRobotin();
        comprobarGanador();
        
    } else {
        alert("Casilla ya seleccionada");
    }
}

// marcar IA
function marcaRobotin() {
    var celdas = document.querySelectorAll('div');
    var celdasNoMarcadas = [];
    
    celdas.forEach(function(celda, i) {
        if (celda.textContent === "") {
            celdasNoMarcadas.push(i);
        }
    });

    if (celdasNoMarcadas.length > 0) {
        var indiceAleatorio = celdasNoMarcadas[Math.floor(Math.random() * celdasNoMarcadas.length)];
        
        var celdaAleatoria = celdas[indiceAleatorio];
        celdaAleatoria.innerHTML = "O";

    } else if (celdasNoMarcadas.length <= 0){
        alert ("Hubo un empate");
    }
}

// comprobar ganador
function comprobarGanador(){
    
    // jugador gana
    if(c1.textContent === "X" && c2.textContent === "X" && c3.textContent === "X") alert("El jugador a ganado");
    else if(c4.textContent === "X" && c5.textContent === "X" && c6.textContent === "X") alert("El jugador a ganado");
    else if(c7.textContent === "X" && c8.textContent === "X" && c9.textContent === "X") alert("El jugador a ganado");
    else if(c1.textContent === "X" && c4.textContent === "X" && c7.textContent === "X") alert("El jugador a ganado");
    else if(c2.textContent === "X" && c5.textContent === "X" && c8.textContent === "X") alert("El jugador a ganado");
    else if(c3.textContent === "X" && c6.textContent === "X" && c9.textContent === "X") alert("El jugador a ganado");
    else if(c1.textContent === "X" && c5.textContent === "X" && c9.textContent === "X") alert("El jugador a ganado");
    else if(c7.textContent === "X" && c5.textContent === "X" && c3.textContent === "X") alert("El jugador a ganado");

    // CPU gana
    else if(c4.textContent === "O" && c5.textContent === "O" && c6.textContent === "O") alert("El ordenador a ganado");
    else if(c7.textContent === "O" && c8.textContent === "O" && c9.textContent === "O") alert("El ordenador a ganado");
    else if(c1.textContent === "O" && c4.textContent === "O" && c7.textContent === "O") alert("El ordenador a ganado");
    else if(c2.textContent === "O" && c5.textContent === "O" && c8.textContent === "O") alert("El ordenador a ganado");
    else if(c3.textContent === "O" && c6.textContent === "O" && c9.textContent === "O") alert("El ordenador a ganado");
    else if(c1.textContent === "O" && c5.textContent === "O" && c9.textContent === "O") alert("El ordenador a ganado");
    else if(c7.textContent === "O" && c5.textContent === "O" && c3.textContent === "O") alert("El ordenador a ganado");
    else if(c7.textContent === "O" && c5.textContent === "O" && c3.textContent === "O") alert("El ordenador a ganado");
}
