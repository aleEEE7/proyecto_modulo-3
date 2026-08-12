document.addEventListener('DOMContentLoaded', function () {

    function limpiarErrores(formulario) {
        formulario.querySelectorAll('.form-error').forEach(function (span) {
            span.textContent = '';
        });
        formulario.querySelectorAll('input').forEach(function (input) {
            input.classList.remove('invalido');
        });
    }

    function marcarError(idCampo, mensaje) {
        var campo = document.getElementById(idCampo);
        var error = document.getElementById('error-' + idCampo);
        campo.classList.add('invalido');
        if (error) {
            error.textContent = mensaje;
        }
    }

    var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /* ---------- Formulario de inicio de sesión ---------- */

    var loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (evento) {
        evento.preventDefault();

        limpiarErrores(loginForm);
        var esValido = true;

        var correo = document.getElementById('login-correo').value.trim();
        var clave = document.getElementById('login-clave').value;

        if (correo === '') {
            marcarError('login-correo', 'Escribe tu correo.');
            esValido = false;
        } else if (!formatoCorreo.test(correo)) {
            marcarError('login-correo', 'Correo no válido.');
            esValido = false;
        }

        if (clave === '') {
            marcarError('login-clave', 'Escribe tu contraseña.');
            esValido = false;
        }

        if (!esValido) {
            var primerError = loginForm.querySelector('.invalido');
            if (primerError) primerError.focus();
            return;
        }

        alert('¡Bienvenido de nuevo!');
        loginForm.reset();
    });

    /* ---------- Formulario de registro ---------- */

    var registroForm = document.getElementById('registro-form');

    registroForm.addEventListener('submit', function (evento) {
        evento.preventDefault();

        limpiarErrores(registroForm);
        var esValido = true;

        var nombre = document.getElementById('registro-nombre').value.trim();
        var apellido = document.getElementById('registro-apellido').value.trim();
        var correo = document.getElementById('registro-correo').value.trim();
        var clave = document.getElementById('registro-clave').value;
        var clave2 = document.getElementById('registro-clave2').value;

        if (nombre === '') {
            marcarError('registro-nombre', 'Escribe tu nombre.');
            esValido = false;
        }

        if (apellido === '') {
            marcarError('registro-apellido', 'Escribe tu apellido.');
            esValido = false;
        }

        if (correo === '') {
            marcarError('registro-correo', 'Escribe tu correo.');
            esValido = false;
        } else if (!formatoCorreo.test(correo)) {
            marcarError('registro-correo', 'Correo no válido.');
            esValido = false;
        }

        if (clave === '') {
            marcarError('registro-clave', 'Crea una contraseña.');
            esValido = false;
        } else if (clave.length < 6) {
            marcarError('registro-clave', 'Mínimo 6 caracteres.');
            esValido = false;
        }

        if (clave2 === '') {
            marcarError('registro-clave2', 'Repite tu contraseña.');
            esValido = false;
        } else if (clave !== clave2) {
            marcarError('registro-clave2', 'Las contraseñas no coinciden.');
            esValido = false;
        }

        if (!esValido) {
            var primerError = registroForm.querySelector('.invalido');
            if (primerError) primerError.focus();
            return;
        }

        alert('¡Cuenta creada, ' + nombre + '!');
        registroForm.reset();
    });

});
