
// pedir usuario
document.addEventListener('DOMContentLoaded', function () {

    do {
        usuario = prompt("Introduce el nombre de usuario");
        if (!isNaN(usuario) || usuario === undefined) {

            alert("ERROR. Nombre de usuario no válido");
        } else {

            document.getElementById("bienvenida").innerHTML = "Bienvenido, " + usuario;
            break;
        }
    } while (true);
});


document.addEventListener('DOMContentLoaded', function () {

    // tablero
    const menu = document.getElementById('menu');
    const tablero = document.getElementById('tablero');

    const jugarBtn = document.getElementById('jugarBtn');
    const estadisticasBtn = document.getElementById('estadisticasBtn');

    jugarBtn.addEventListener('click', function () { // ejecuta la funcion 'iniciarJuego()'
        
        iniciarJuego();
    });

    // iniciarJuego()
    function iniciarJuego() {
        // Puedes implementar aquí la lógica del juego de Tres en Raya
        // Por ejemplo, mostrar el tablero y gestionar los clics en las casillas
        tablero.style.display = 'block';

        // Aquí puedes agregar más lógica según las reglas del juego
    }

    estadisticasBtn.addEventListener('click', function () {
        // Lógica para ver estadísticas, si es necesario
        console.log('Ver estadísticas');
    });
});
