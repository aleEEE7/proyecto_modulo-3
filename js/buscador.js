document.addEventListener('DOMContentLoaded', function () {

    var input = document.querySelector('.search-box input');
    var searchBox = document.querySelector('.search-box');
    var tarjetas = document.querySelectorAll('.product-card');

    if (!input || !searchBox || tarjetas.length === 0) return;

    var caja = document.createElement('div');
    caja.className = 'search-suggestions';
    searchBox.appendChild(caja);

    function cerrarSugerencias() {
        caja.classList.remove('active');
        caja.innerHTML = '';
    }

    input.addEventListener('input', function () {

        var texto = input.value.trim().toLowerCase();

        if (texto === '') {
            cerrarSugerencias();
            return;
        }

        var coincidencias = [];

        tarjetas.forEach(function (tarjeta) {

            var titulo = tarjeta.querySelector('h3');
            if (!titulo) return;

            var nombre = titulo.textContent.trim();

            if (nombre.toLowerCase().includes(texto)) {
                coincidencias.push({
                    nombre: nombre,
                    precio: tarjeta.querySelector('.price') ? tarjeta.querySelector('.price').textContent.trim() : '',
                    imagen: tarjeta.querySelector('img') ? tarjeta.querySelector('img').getAttribute('src') : '',
                    tarjeta: tarjeta
                });
            }
        });

        caja.innerHTML = '';

        if (coincidencias.length === 0) {
            var vacio = document.createElement('div');
            vacio.className = 'search-suggestion-empty';
            vacio.textContent = 'No se encontraron productos.';
            caja.appendChild(vacio);
        } else {
            coincidencias.slice(0, 6).forEach(function (item) {

                var fila = document.createElement('div');
                fila.className = 'search-suggestion-item';
                fila.innerHTML =
                    '<img src="' + item.imagen + '" alt="' + item.nombre + '">' +
                    '<div class="search-suggestion-info"><h4>' + item.nombre + '</h4></div>' +
                    '<span class="search-suggestion-price">' + item.precio + '</span>';

                fila.addEventListener('click', function () {
                    cerrarSugerencias();
                    input.value = '';
                    item.tarjeta.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    item.tarjeta.classList.add('search-highlight');
                    setTimeout(function () {
                        item.tarjeta.classList.remove('search-highlight');
                    }, 1200);
                });

                caja.appendChild(fila);
            });
        }

        caja.classList.add('active');
    });

    document.addEventListener('click', function (evento) {
        if (!searchBox.contains(evento.target)) {
            cerrarSugerencias();
        }
    });

});