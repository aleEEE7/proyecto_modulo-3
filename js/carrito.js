document.addEventListener('DOMContentLoaded', function () {

    var envio = 5.00;

    var carrito = [
        {
            id: 1,
            nombre: "Bone Shaker",
            precio: 12.50,
            cantidad: 1,
            imagen: "../assets/Bone_shaker.jpg"
        },
        {
            id: 2,
            nombre: "'67 Camaro",
            precio: 7.00,
            cantidad: 2,
            imagen: "../assets/67_camaro.png"
            
        }
    ];

    var contenedor = document.getElementById('cart-items');
    var mensajeVacio = document.getElementById('cart-empty');
    var elementoSubtotal = document.getElementById('carrito-subtotal');
    var elementoEnvio = document.getElementById('carrito-envio');
    var elementoTotal = document.getElementById('carrito-total');
    var botonProceder = document.getElementById('btn-proceder');

    function formatoPrecio(numero) {
        return '$' + numero.toFixed(2);
    }

    function renderizar() {

        contenedor.innerHTML = '';

        if (carrito.length === 0) {
            mensajeVacio.style.display = 'block';
            botonProceder.style.pointerEvents = 'none';
            botonProceder.style.opacity = '0.5';
        } else {
            mensajeVacio.style.display = 'none';
            botonProceder.style.pointerEvents = 'auto';
            botonProceder.style.opacity = '1';
        }

        carrito.forEach(function (producto) {

            var fila = document.createElement('div');
            fila.className = 'cart-item';

            fila.innerHTML =
                '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">' +
                '<div class="cart-item-info">' +
                    '<h4>' + producto.nombre + '</h4>' +
                    '<span>' + formatoPrecio(producto.precio) + ' c/u</span>' +
                '</div>' +
                '<div class="cart-qty">' +
                    '<button type="button" class="cart-qty-btn" data-accion="restar" data-id="' + producto.id + '">-</button>' +
                    '<span class="cart-qty-value">' + producto.cantidad + '</span>' +
                    '<button type="button" class="cart-qty-btn" data-accion="sumar" data-id="' + producto.id + '">+</button>' +
                '</div>' +
                '<div class="cart-item-price">' + formatoPrecio(producto.precio * producto.cantidad) + '</div>' +
                '<button type="button" class="cart-remove" data-accion="eliminar" data-id="' + producto.id + '" aria-label="Eliminar">' +
                    '<i class="fa-solid fa-trash"></i>' +
                '</button>';

            contenedor.appendChild(fila);
        });

        actualizarTotales();
    }

    function actualizarTotales() {

        var subtotal = carrito.reduce(function (suma, producto) {
            return suma + producto.precio * producto.cantidad;
        }, 0);

        var envioFinal = carrito.length === 0 ? 0 : envio;
        var total = subtotal + envioFinal;

        elementoSubtotal.textContent = formatoPrecio(subtotal);
        elementoEnvio.textContent = formatoPrecio(envioFinal);
        elementoTotal.textContent = formatoPrecio(total);
    }

    contenedor.addEventListener('click', function (evento) {

        var boton = evento.target.closest('button');
        if (!boton) return;

        var id = parseInt(boton.getAttribute('data-id'), 10);
        var accion = boton.getAttribute('data-accion');
        var producto = carrito.find(function (p) { return p.id === id; });

        if (!producto) return;

        if (accion === 'sumar') {
            producto.cantidad++;
        }

        if (accion === 'restar') {
            producto.cantidad--;
            if (producto.cantidad < 1) {
                carrito = carrito.filter(function (p) { return p.id !== id; });
            }
        }

        if (accion === 'eliminar') {
            carrito = carrito.filter(function (p) { return p.id !== id; });
        }

        renderizar();
    });

    renderizar();

});
