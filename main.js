document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;
    document.querySelectorAll('.error').forEach(span => span.textContent = '');
    if (!validarApellido()) {
        isValid = false;
    }
    if (!validarNombre()) {
        isValid = false;
    }
    if (!validarDNI()) {
        isValid = false;
    }
    if (!validarFechaNacimiento()) {
        isValid = false;
    }
    if (!validarEmail()) {
        isValid = false;
    }
    if (isValid) {
        alert('Formulario válido. ¡Registro exitoso!');
    } else {
        alert('Por favor, corrige los errores en el formulario.');
    }
});

function validarApellido() {
    const apellidoInput = document.getElementById('apellido');
    const apellidoError = document.getElementById('apellidoError');
    let apellido = apellidoInput.value.trim();
    const validos = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (apellido === '') {
        apellidoError.textContent = 'El apellido es obligatorio.';
        return false;
    } else if (!validos.test(apellido)) {
        apellidoError.textContent = 'El apellido solo debe contener caracteres.';
        return false;
    }
    return true;
}

function validarNombre() {
    const nombreInput = document.getElementById('nombre');
    const nombreError = document.getElementById('nombreError');
    let nombre = nombreInput.value.trim();
    const validos = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 

    if (nombre === '') {
        nombreError.textContent = 'El nombre es obligatorio.';
        return false;
    } else if (!validos.test(nombre)) {
        nombreError.textContent = 'El nombre solo debe contener caracteres.';
        return false;
    }
    return true;
}

function validarDNI() {
    const dniInput = document.getElementById('dni');
    const dniError = document.getElementById('dniError');
    const dni = dniInput.value.trim();

    if (dni === '') {
        dniError.textContent = 'El DNI es obligatorio.';
        return false;
    } else if (dni.length !=8) {
        dniError.textContent = 'El DNI debe contener exactamente 8 dígitos numéricos.';
        return false;
    }
    return true;
}

function validarFechaNacimiento() {
    const fechaInput = document.getElementById('fechaNacimiento');
    const fechaError = document.getElementById('fechaNacimientoError');
    const fechaStr = fechaInput.value;

    if (fechaStr === '') {
        fechaError.textContent = 'La fecha de nacimiento es obligatoria.';
        return false;
    }

    const fechaNacimiento = new Date(fechaStr);
    const fechaLimite = new Date('2006-01-01');

    if (fechaNacimiento <= fechaLimite) {
         fechaError.textContent = 'La fecha de nacimiento debe superior al año 2006.';
         return false;
    }
    if (isNaN(fechaNacimiento.getTime())) {
        fechaError.textContent = 'Formato de fecha inválido.';
        return false;
    }

    return true;
}

function validarEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const email = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        emailError.textContent = 'El email es obligatorio.';
        return false;
    } else if (!regex.test(email)) {
        emailError.textContent = 'El formato del email no es válido.';
        return false;
    }
    return true;
}

document.getElementById('preguntasBtn').addEventListener('click', async function() {
    const respuestasContainer = document.getElementById('respuestasContainer');
    respuestasContainer.innerHTML = '';

    const preguntas = [
        "¿Cuál es tu nacionalidad?",
        "¿Cuál es tu color favorito?",
        "¿Cómo se llama tu mascota?"
    ];
    const respuestas = [];

    for (let i = 0; i < preguntas.length; i++) {
        let respuesta = prompt(preguntas[i]);
        while (respuesta === null || respuesta.trim() === '') {
             respuesta = prompt(`Por favor, responde a la pregunta:\n${preguntas[i]}`);
        }
        respuestas.push(`${preguntas[i].replace('¿Cuál es tu ', '').replace('¿Cómo se llama tu ', '').replace('?', '')}: ${respuesta}`);
    }

    const respuestasTitulo = document.createElement('h4');
    respuestasTitulo.textContent = 'Sus respuestas fueron:';
    respuestasContainer.appendChild(respuestasTitulo);

    const respuestasList = document.createElement('ul');
    respuestas.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        respuestasList.appendChild(li);
    });
    respuestasContainer.appendChild(respuestasList);
});
