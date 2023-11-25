let tableroVisible = false;

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
        celdas.style.color = "green";
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
        celdaAleatoria.style.color = "red";
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
            var nombre = localStorage.getItem("1");
            var Id = obtenerUltimoId();
            var nuevoId = Id + 1;
            var fechaActual = obtenerFechaActual();

            localStorage.setItem(nuevoId.toString(), JSON.stringify({
                nombre: nombre,
                fecha: fechaActual,
                puntos: 3
            }));
                var cantidadDatos = localStorage.length;
                var limiteMaximo = 27;

                if (cantidadDatos >= limiteMaximo) {
                    eliminarElementosAntiguos(cantidadDatos - limiteMaximo + 1);
                }
            vaciarCampos();
            return;
        } else if (
            casilla1.textContent === "O" && casilla2.textContent === "O" && casilla3.textContent === "O"
        ) {
            alert("El ordenador gana");
            var nombre = "PC";
            var Id = obtenerUltimoId();
            var nuevoId = Id + 1;
            var fechaActual = obtenerFechaActual();

            localStorage.setItem(nuevoId.toString(), JSON.stringify({
                nombre: nombre,
                fecha: fechaActual,
                puntos: 0
            }));
                var cantidadDatos = localStorage.length;
                var limiteMaximo = 27;

                if (cantidadDatos >= limiteMaximo) {
                    eliminarElementosAntiguos(cantidadDatos - limiteMaximo - 1);
                }
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
    const todasLasClaves = Object.keys(localStorage);
    const estadisticas = document.getElementById('estadisticas');
  
    estadisticas.innerHTML = '';
  
    const elementos = todasLasClaves
      .filter(clave => clave !== '1')
      .map(clave => JSON.parse(localStorage.getItem(clave)) || {});
  
    elementos.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
  
      if (fechaA > fechaB) return 1;
      if (fechaA < fechaB) return -1;
  
      return a.puntos - b.puntos;
    });
  
    elementos.forEach(elementoLocalStorage => {
      const divElement = document.createElement('div');
      divElement.innerHTML = `
        <p>nombre: ${elementoLocalStorage.nombre}</p>
        <p>fecha: ${elementoLocalStorage.fecha}</p>
        <p>puntos: ${elementoLocalStorage.puntos}</p>
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