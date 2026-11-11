const formularioTareas = document.getElementById("formulario-tareas");
const entradaTarea = document.getElementById("entrada-tarea");
const listaTareas = document.getElementById("lista-tareas");
const mensajeFormulario = document.getElementById("mensaje-formulario");

const contadorTotal = document.getElementById("contador-total");
const contadorCompletadas = document.getElementById("contador-completadas");
const contadorPendientes = document.getElementById("contador-pendientes");

const porcentajeProgreso = document.getElementById("porcentaje-progreso");
const rellenoProgreso = document.getElementById("relleno-progreso");

let tareas = [];
let siguienteId = 1;

formularioTareas.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const texto = entradaTarea.value.trim();

    if (texto === "") {
        mensajeFormulario.textContent = "No puedes agregar tareas vacías.";
        return;
    }
    tareas.push({
        id: siguienteId++,
        texto: texto,
        completada: false
    });
    entradaTarea.value = "";
    mensajeFormulario.textContent = "";

    renderizarTareas();
});
function renderizarTareas() {
    listaTareas.innerHTML = "";

    if (tareas.length === 0) {
        const mensajeVacio = document.createElement("li");
        mensajeVacio.className = "mensaje-vacio";
        mensajeVacio.textContent = "No hay tareas todavía...";
        listaTareas.appendChild(mensajeVacio);
    }

    tareas.forEach(function(tarea) {
        const elementoLi = document.createElement("li");

        elementoLi.className = tarea.completada ? "tarea completada" : "tarea";

        const marca = document.createElement("span");
        marca.className = "marca-tarea";
        marca.textContent = tarea.completada ? "✓" : "○";

        const textoSpan = document.createElement("span");
        textoSpan.className = "texto-tarea";
        textoSpan.textContent = tarea.texto;

        const acciones = document.createElement("div");
        acciones.className = "acciones-tarea";

        if (!tarea.completada) {
            const botonCompletar = document.createElement("button");
            botonCompletar.textContent = "Completar";
            botonCompletar.type = "button";

            botonCompletar.addEventListener("click", function() {
                completarTarea(tarea.id);
            });

            acciones.appendChild(botonCompletar);
        }

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";
        botonEliminar.className = "boton-eliminar";

        botonEliminar.addEventListener("click", function() {
            eliminarTarea(tarea.id);
        });

        acciones.appendChild(botonEliminar);

        elementoLi.appendChild(marca);
        elementoLi.appendChild(textoSpan);
        elementoLi.appendChild(acciones);

        listaTareas.appendChild(elementoLi);
    });
    actualizarContadores();
}

function completarTarea(id) {
    tareas = tareas.map(function(tarea) {
        if (tarea.id === id) {
            return { ...tarea, completada: true };
        }
        return tarea;
    });

    renderizarTareas();
}
function eliminarTarea(id) {
    tareas = tareas.filter(function(tarea) {
        return tarea.id !== id;
    });

    renderizarTareas();
}

function actualizarContadores() {
    const total = tareas.length;
    const completadas = tareas.filter(function(tarea) {
        return tarea.completada;
    }).length;

    const pendientes = total - completadas;

    const porcentaje = total === 0
        ? 0
        : Math.round((completadas / total) * 100);

    contadorTotal.textContent = total;
    contadorCompletadas.textContent = completadas;
    contadorPendientes.textContent = pendientes;

    porcentajeProgreso.textContent = porcentaje + "%";
    rellenoProgreso.style.width = porcentaje + "%";
}
renderizarTareas();