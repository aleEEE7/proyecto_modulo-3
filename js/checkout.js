document.addEventListener('DOMContentLoaded', function () {

    var metodosPago = document.querySelectorAll('.payment-method');
    var camposTarjeta = document.getElementById('campos-tarjeta');
    var metodoActual = 'tarjeta';

    var params = new URLSearchParams(window.location.search);
    var productoNombre = params.get('producto');
    var productoPrecio = parseFloat(params.get('precio'));
    var productoImagen = params.get('imagen');

    if (productoNombre && !isNaN(productoPrecio)) {

        var contenedorResumen = document.getElementById('order-summary-items');
        contenedorResumen.innerHTML = '';

        var rutaImagen = "../assets/" + (productoImagen || "logo.png");

        var item = document.createElement('div');
        item.className = 'order-summary-item';
        item.innerHTML =
            '<img src="' + rutaImagen + '" alt="' + productoNombre + '">' +
            '<div class="order-summary-item-info">' +
                '<h4>' + productoNombre + '</h4>' +
                '<span>Cantidad: 1</span>' +
            '</div>' +
            '<div class="order-summary-item-price">$' + productoPrecio.toFixed(2) + '</div>';

        contenedorResumen.appendChild(item);

        var envio = 5.00;
        var total = productoPrecio + envio;

        document.getElementById('resumen-subtotal').textContent = '$' + productoPrecio.toFixed(2);
        document.getElementById('resumen-envio').textContent = '$' + envio.toFixed(2);
        document.getElementById('resumen-total').textContent = '$' + total.toFixed(2);
    }

    metodosPago.forEach(function (metodo) {

        metodo.addEventListener('click', function () {

            metodosPago.forEach(function (m) {
                m.classList.remove('active');
            });

            metodo.classList.add('active');

            metodoActual = metodo.getAttribute('data-metodo');

            if (metodoActual === 'tarjeta') {
                camposTarjeta.style.display = 'block';
            } else {
                camposTarjeta.style.display = 'none';
            }

        });

    });

    var formulario = document.getElementById('checkout-form');

    formulario.addEventListener('submit', function (evento) {

        evento.preventDefault();

        var esValido = true;

        document.querySelectorAll('.form-error').forEach(function (span) {
            span.textContent = '';
        });

        document.querySelectorAll('.form-group input').forEach(function (input) {
            input.classList.remove('invalido');
        });

        function marcarError(idCampo, mensaje) {

            var campo = document.getElementById(idCampo);
            var error = document.getElementById('error-' + idCampo);

            campo.classList.add('invalido');

            if (error) {
                error.textContent = mensaje;
            }

            esValido = false;
        }

        var nombre = document.getElementById('nombre').value.trim();
        var apellido = document.getElementById('apellido').value.trim();
        var direccion = document.getElementById('direccion').value.trim();
        var ciudad = document.getElementById('ciudad').value.trim();
        var telefono = document.getElementById('telefono').value.trim();

        if (nombre === '') marcarError('nombre', 'Escribe tu nombre.');
        if (apellido === '') marcarError('apellido', 'Escribe tu apellido.');
        if (direccion === '') marcarError('direccion', 'Escribe tu dirección.');
        if (ciudad === '') marcarError('ciudad', 'Escribe tu ciudad.');

        var soloNumeros = telefono.replace(/\D/g, '');

        if (telefono === '') {
            marcarError('telefono', 'Escribe tu teléfono.');
        } else if (soloNumeros.length < 8) {
            marcarError('telefono', 'El teléfono parece incompleto.');
        }

        if (metodoActual === 'tarjeta') {

            var numeroTarjeta = document.getElementById('numero-tarjeta').value.trim();
            var vencimiento = document.getElementById('vencimiento').value.trim();
            var cvv = document.getElementById('cvv').value.trim();

            var soloNumerosTarjeta = numeroTarjeta.replace(/\D/g, '');

            if (soloNumerosTarjeta.length !== 16) {
                marcarError('numero-tarjeta', 'Debe tener 16 dígitos.');
            }

            var formatoVencimiento = /^(0[1-9]|1[0-2])\/\d{2}$/;

            if (!formatoVencimiento.test(vencimiento)) {
                marcarError('vencimiento', 'Formato MM/AA.');
            }

            if (cvv.length < 3 || cvv.length > 4) {
                marcarError('cvv', '3 o 4 dígitos.');
            }
        }

        if (!esValido) {

            var primerError = document.querySelector('.invalido');

            if (primerError) {
                primerError.focus();
            }

            return;
        }

        // Mostrar modal de compra exitosa
        document.getElementById('modal-exito').classList.add('active');

        // Reiniciar formulario
        formulario.reset();

        // Restaurar método de pago
        camposTarjeta.style.display = 'block';

        metodosPago.forEach(function (m) {
            m.classList.remove('active');
        });

        metodosPago[0].classList.add('active');
        metodoActual = 'tarjeta';

    });

    // Cerrar modal haciendo clic fuera
    var modal = document.getElementById('modal-exito');

    modal.addEventListener('click', function (e) {

        if (e.target === modal) {
            modal.classList.remove('active');
        }

    });

});