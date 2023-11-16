// abrir formulario al arrancar la página
document.addEventListener("DOMContentLoaded", function() {

    window.open("formulario.html", "Tres en raya", "width=500,height=300, location=no");
});
  
// validar formulario
function validar() {

    const usuario = document.getElementById("usuario").value;

    if (usuario === undefined) alert("ERROR. El usuario no puede estar vacío");
    else {
        alert("Bienvenido, " + usuario);
        window.close();
    }
}

let tableroVisible = false;

document.addEventListener('DOMContentLoaded', function () {
    // tablero
    const menu = document.getElementById('menu');
    const tablero = document.getElementById('tablero');

    const jugarBtn = document.getElementById('jugarBtn');
    const estadisticasBtn = document.getElementById('estadisticasBtn');

    jugarBtn.addEventListener('click', function () { 
        // Hace visible el tablero
        tablero.style.display = 'block';
        tableroVisible = true;
    });

    estadisticasBtn.addEventListener('click', function () {
        // Hace visibles las estadisticas
        console.log('Ver estadísticas');
    });
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
    var celdas = casilla.querySelector('span');
    
    if (celdas.textContent === "") {
        celdas.textContent = "X";
        marcaRobotin();
        comprobarGanador();
    } else {
        alert("Casilla ya seleccionada");
    }
}

// marcar IA
function marcaRobotin() {
    var celdas = document.querySelectorAll('span');
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
    }
}

// comprobar ganador
function comprobarGanador() {
    const combinacionesGanadoras = [
        [c1, c2, c3],
        [c4, c5, c6],
        [c7, c8, c9],
        [c1, c4, c7],
        [c2, c5, c8],
        [c3, c6, c9],
        [c1, c5, c9],
        [c7, c5, c3]
    ];

    for (const combinacion of combinacionesGanadoras) {
        const [casilla1, casilla2, casilla3] = combinacion;

        if (
            casilla1.textContent === "X" && casilla2.textContent === "X" && casilla3.textContent === "X"
        ) {
            alert("El jugador gana");
            vaciarCampos();
            return;
        } else if (
            casilla1.textContent === "O" && casilla2.textContent === "O" && casilla3.textContent === "O"
        ) {
            alert("El ordenador gana");
            vaciarCampos();
            return;
        }
    }
    empate();
}
function empate() {
    var celdas = document.querySelectorAll('.casilla span');
    var celdasNoMarcadas = [];
    
    celdas.forEach(function(celda, i) {
        if (celda.textContent === "") {
            celdasNoMarcadas.push(i);
        }
    });

    if (celdasNoMarcadas.length === 0) {
        alert("Hubo un empate");
        vaciarCampos();
    }
}
function vaciarCampos(){
    var celdas = document.querySelectorAll('.casilla');
    celdas.forEach(function(celda) {
        var spanElement = celda.querySelector('span');
        if (spanElement) {
            spanElement.innerHTML = "";
        }
    });
    if (tableroVisible) {
        tablero.style.display = 'none';
        tableroVisible = false;
    }

}
