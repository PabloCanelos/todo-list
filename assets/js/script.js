// Definir un arreglo de objetos con algunas tareas iniciales
const tareas = [
    { id: 1, descripcion: 'Estudiar JavaScript', realizada: false },
    { id: 2, descripcion: 'Hacer ejercicio', realizada: false },
    { id: 3, descripcion: 'Leer un libro', realizada: false }
];

// Seleccionar elementos HTML
const listaTareas = document.querySelector('#listaTareas');
const totalTareas = document.querySelector('#totalTareas');
const tareasCompletadas = document.querySelector('#tareasCompletadas');
const btnAgregar = document.querySelector('#btnAgregar');
const inputNuevaTarea = document.querySelector('#nuevaTarea');

// Función para mostrar las tareas en la lista
function mostrarTareas() {
    listaTareas.innerHTML = ''; // Limpiar la lista

    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.classList.add('tarea-item');

        // Añadir descripción de la tarea
        const textoTarea = document.createElement('span');
        textoTarea.textContent = tarea.descripcion;
        li.appendChild(textoTarea);

        // Añadir texto de "realizado" si la tarea está completa
        if (tarea.realizada) {
            const textoRealizado = document.createElement('span');
            textoRealizado.textContent = ' (Realizado)';
            textoRealizado.classList.add('realizado-texto');
            li.appendChild(textoRealizado);
            li.classList.add('completed'); // Aplicar clase de completado
        }

        // Añadir botón de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'eliminar';

        botonEliminar.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar marcar como completada al eliminar
            eliminarTarea(index);
        });

        li.appendChild(botonEliminar);

        // Añadir evento para marcar como completada
        li.addEventListener('click', () => {
            tarea.realizada = !tarea.realizada;
            mostrarTareas(); // Volver a mostrar las tareas para reflejar el cambio
        });

        listaTareas.appendChild(li);
    });

    // Actualizar contadores de tareas
    totalTareas.textContent = tareas.length;
    tareasCompletadas.textContent = tareas.filter(t => t.realizada).length;
}

// Función para eliminar una tarea
function eliminarTarea(index) {
    tareas.splice(index, 1);
    mostrarTareas();
}

// Función para agregar una nueva tarea
function agregarTarea() {
    const nuevaTareaDescripcion = inputNuevaTarea.value;
    if (nuevaTareaDescripcion) {
        const nuevaTarea = {
            id: tareas.length + 1,
            descripcion: nuevaTareaDescripcion,
            realizada: false
        };
        tareas.push(nuevaTarea);
        inputNuevaTarea.value = ''; // Limpiar el campo de entrada
        mostrarTareas();
    }
}

// Función para actualizar los contadores de tareas
function actualizarContadores() {
    totalTareas.textContent = tareas.length;
    tareasCompletadas.textContent = tareas.filter(t => t.realizada).length;
}

// Asociar la función agregarTarea al botón de agregar
btnAgregar.addEventListener('click', agregarTarea);

// Mostrar las tareas iniciales al cargar la página
mostrarTareas();




