
document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    const tablero = document.getElementById('tablero');

    const jugarBtn = document.getElementById('jugarBtn');
    const estadisticasBtn = document.getElementById('estadisticasBtn');

    jugarBtn.addEventListener('click', function () {
        // Iniciar la lógica del juego cuando se haga clic en "Jugar Partida"
        iniciarJuego();
    });

    // Lógica del juego
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
