
// Controla la visibilidad del tablero y las estadísticas
let tableroVisible = false;
// Configuración inicial cuando se carga el documento
document.addEventListener('DOMContentLoaded', function () {
    // tablero
    const tablero = document.getElementById('tablero');
    const estadisticas = document.getElementById('estadisticas');

    const jugarBtn = document.getElementById('jugarBtn');
    const estadisticasBtn = document.getElementById('estadisticasBtn');

    jugarBtn.addEventListener('click', function () { 
        // Hace visible el tablero
        estadisticas.style.display = 'none';
        tablero.style.display = 'block';
        tableroVisible = true;
    });

    estadisticasBtn.addEventListener('click', function () {
        // Hace visibles las estadisticas
        tablero.style.display = 'none';
        estadisticas.style.display = 'block';
        verEstadisticas();
    });
});

// Definición de las casillas del tablero
var c1 = document.getElementById("1");
var c2 = document.getElementById("2");
var c3 = document.getElementById("3");
var c4 = document.getElementById("4");
var c5 = document.getElementById("5");
var c6 = document.getElementById("6");
var c7 = document.getElementById("7");
var c8 = document.getElementById("8");
var c9 = document.getElementById("9");

// Función para marcar una casilla seleccionada por el jugador
function marcarCasilla(casilla){
    var celdas = casilla.querySelector('span');
    
    if (celdas.textContent === "") {
        celdas.textContent = "X";
        celdas.style.color = "green";
        marcaRobotin();
        
        comprobarGanador();
    } else {
        alert("Casilla ya seleccionada");
    }
}

// Función para la jugada de la IA (ordenador)
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
        celdaAleatoria.style.color = "red";
    }
}

// Función para comprobar si hay un ganador
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

    // Recuperar el alias del jugador
    var nombreJugador = localStorage.getItem("1") || "Jugador";

    for (const combinacion of combinacionesGanadoras) {
        const [casilla1, casilla2, casilla3] = combinacion;

        if (casilla1.textContent === "X" && casilla2.textContent === "X" && casilla3.textContent === "X") {
            alert("¡Ganaste, " + nombreJugador + "!");
            guardarPartida(nombreJugador, 3);
            vaciarCampos();
            return;
        } else if (casilla1.textContent === "O" && casilla2.textContent === "O" && casilla3.textContent === "O") {
            alert("El ordenador gana. ¡Inténtalo de nuevo, " + nombreJugador + "!");
            guardarPartida("PC", 0);
            vaciarCampos();
            return;
        }
    }

    // Verificar empate
    if (empate()) {
        alert("Hubo un empate, " + nombreJugador + ".");
        guardarPartida(nombreJugador, 1);
        vaciarCampos();
    }
}

// Función para comprobar si hay un empate
function empate() {
    var celdas = document.querySelectorAll('.casilla span');
    var celdasNoMarcadas = [];

    celdas.forEach(function(celda) {
        if (celda.textContent === "") {
            celdasNoMarcadas.push(celda);
        }
    });

    return celdasNoMarcadas.length === 0;
}
// Función para guardar la partida
function guardarPartida(nombre, puntos) {
    var Id = obtenerUltimoId() + 1;
    var fechaActual = obtenerFechaActual();

    localStorage.setItem(Id.toString(), JSON.stringify({
        nombre: nombre,
        fecha: fechaActual,
        puntos: puntos
    }));

    var cantidadDatos = localStorage.length;
    var limiteMaximo = 25;

    if (cantidadDatos > limiteMaximo) {
        eliminarElementosAntiguos(cantidadDatos - limiteMaximo);
    }
}
// Función para vaciar campos
function vaciarCampos(){
    var celdas = document.querySelectorAll('.casilla span');
    celdas.forEach(function(celda) {
        celda.textContent = "";
    });
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
        var nombre = localStorage.getItem("1");
        var Id = obtenerUltimoId();
        var nuevoId = Id + 1;
        var fechaActual = obtenerFechaActual();

        localStorage.setItem(nuevoId.toString(), JSON.stringify({
            nombre: nombre,
            fecha: fechaActual,
            puntos: 1
        }));
            var cantidadDatos = localStorage.length;
            var limiteMaximo = 27;

            if (cantidadDatos >= limiteMaximo) {
                eliminarElementosAntiguos(cantidadDatos - limiteMaximo + 1);
            }
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

$(document).ready(function() {
    $(".casilla:contains('X') span").css("color", "green");
    $(".casilla:contains('O') span").css("color", "red");
});

//Muestra las estadisticas de las ultimas 25 partidas
function verEstadisticas() {
    const estadisticas = document.getElementById('estadisticas');
    estadisticas.innerHTML = '';

    const todasLasClaves = Object.keys(localStorage).filter(clave => clave !== '1');

    // Verificar si hay estadísticas para mostrar
    if (todasLasClaves.length === 0) {
        estadisticas.innerHTML = '<p>No hay partidas jugadas aún.</p>';
        return;
    }

    // Si hay datos, procesarlos y mostrarlos
    const elementos = todasLasClaves.map(clave => JSON.parse(localStorage.getItem(clave)) || {});

    // Ordenar por fecha y puntos
    elementos.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);

        if (fechaA > fechaB) return -1;
        if (fechaA < fechaB) return 1;

        return b.puntos - a.puntos; // Ordenar descendente por puntos
    });

    // Mostrar las estadísticas
    elementos.forEach(elementoLocalStorage => {
        const divElement = document.createElement('div');
        divElement.innerHTML = `
            <p><strong>Ganador:</strong> ${elementoLocalStorage.nombre}</p>
            <p><strong>Fecha:</strong> ${elementoLocalStorage.fecha}</p>
            <p><strong>Puntos:</strong> ${elementoLocalStorage.puntos}</p>
            <hr>
        `;

        estadisticas.appendChild(divElement);
    });
}

// Obtener el ultimo id del localStorage
function obtenerUltimoId() {
    var ultimoId = 0;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (!isNaN(key)) {
            var id = parseInt(key);
            if (id > ultimoId) {
                ultimoId = id;
            }
        }
    }
    return ultimoId;
}

// Obtener la fecha actual en formato YYYY-MM-DD HH:MM:SS
function obtenerFechaActual() {
    var fecha = new Date();
    var formatoFecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() +
        " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    return formatoFecha;
}

// Función para eliminar los elementos más antiguos excluyendo el id 1
function eliminarElementosAntiguos(cantidad) {
    for (var i = 0; i < cantidad; i++) {
        var key = obtenerClaveConElMenorIdExcluyendoUno();
        localStorage.removeItem(key);
    }
}

// Función para obtener la clave con el menor id excluyendo el id 1
function obtenerClaveConElMenorIdExcluyendoUno() {
    var menorId = Infinity;
    var claveConMenorId = null;

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (!isNaN(key)) {
            var id = parseInt(key);
            if (id !== 1 && id < menorId) {
                menorId = id;
                claveConMenorId = key;
            }
        }
    }

    return claveConMenorId;
}
