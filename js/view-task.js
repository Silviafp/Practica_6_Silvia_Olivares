import { cargarTareas, guardarTareas } from "./utils/storage.js";
import { obtenerIdUrl } from "./utils/commons.js";

const idTarea = parseInt(obtenerIdUrl());
const tareas = cargarTareas();
const tarea = tareas.find((tarea) => tarea.id === idTarea);

function iniciarBotonEditar() {
    const btnEditar = document.querySelector("#btn-edit");
    btnEditar.setAttribute("href", `form-task.html?id=${tarea.id}`);
}

function iniciarSelectCambiarEstado() {
    const cambiarEstado = document.querySelector("#change-status");
    cambiarEstado.value = tarea.estado;
}

function cambiarEstadoTarea() {
    const cambiarEstado = document.querySelector("#change-status");
    cambiarEstado.addEventListener("change", (evento) => {
        const confirmacion = confirm("¿Estás seguro de que quieres cambiar el estado de esta tarea?");
        if (confirmacion) {
            const nuevoEstado = evento.target.value;
            const indiceTarea = tareas.findIndex((t) => t.id === tarea.id);
            if (indiceTarea !== -1) {
                tareas[indiceTarea].estado = nuevoEstado;
                guardarTareas(tareas);
                location.reload();
            }
        }
    });
}

function iniciarSelectCambiarPrioridad() {
    const cambiarPrioridad = document.querySelector("#change-priority");
    cambiarPrioridad.value = tarea.prioridad;
}

function cambiarPrioridadTarea() {
    const cambiarPrioridad = document.querySelector("#change-priority");
    cambiarPrioridad.addEventListener("change", (evento) => {
        const confirmacion = confirm("¿Estás seguro de que quieres cambiar la prioridad de esta tarea?");
        if (confirmacion) {
            const nuevaPrioridad = evento.target.value;
            const indiceTarea = tareas.findIndex((t) => t.id === tarea.id);
            if (indiceTarea !== -1) {
                tareas[indiceTarea].prioridad = nuevaPrioridad;
                guardarTareas(tareas);
                location.reload();
            }
        }
    });
}

if (!tarea) {
    alert("Tarea no encontrada.");
    location.href = "index.html";
} else {
    iniciarBotonEditar();
    iniciarSelectCambiarEstado();
    cambiarEstadoTarea();
    iniciarSelectCambiarPrioridad();
    cambiarPrioridadTarea();
    const titulo = document.querySelector("#view-title");
    const descripcion = document.querySelector("#view-description");
    const prioridad = document.querySelector("#view-priority-badge");
    const creadoEl = document.querySelector("#view-created-at");
    const fechaVencimiento = document.querySelector("#view-due-date");
    const estado = document.querySelector("#view-status-badge");

    for (const [clave, valor] of Object.entries(tarea)) {
        if (clave === "titulo") {
            titulo.appendChild(document.createTextNode(valor));
        } else if (clave === "descripcion") {
            descripcion.appendChild(document.createTextNode(valor));
        } else if (clave === "prioridad") {
            const textoPrioridadNodo = document.createTextNode(`Prioridad ${valor}`);
            prioridad.appendChild(textoPrioridadNodo);
            if (valor === "baja") {
                prioridad.classList.add("bg-sky-200", "text-sky-900");
            } else if (valor === "media") {
                prioridad.classList.add("bg-amber-200", "text-amber-900");
            } else if (valor === "alta") {
                prioridad.classList.add("bg-rose-200", "text-rose-900");
            }
        } else if (clave === "estado") {
            let valorEstado = "";
            if (valor === "porHacer") {
                valorEstado = "Por hacer";
            } else if (valor === "enCurso") {
                valorEstado = "En curso";
            } else if (valor === "hecho") {
                valorEstado = "Hecho";
            }
            const textoEstadoNodo = document.createTextNode(valorEstado);
            estado.appendChild(textoEstadoNodo);
            if (valor === "porHacer") {
                estado.classList.add("bg-neutral-50", "text-neutral-700");
            } else if (valor === "enCurso") {
                estado.classList.add("bg-orange-50", "text-orange-700");
            } else if (valor === "hecho") {
                estado.classList.add("bg-emerald-50", "text-emerald-700");
            }
        } else if (clave === "creadoEl") {
            creadoEl.appendChild(document.createTextNode(valor));
        } else if (clave === "fechaVencimiento") { 
            fechaVencimiento.appendChild(document.createTextNode(valor));
        }
    }
}

const btnDelete = document.querySelector("#btn-delete");

btnDelete.addEventListener("click", () => {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.");
    if (confirmacion) {
        const tareas = cargarTareas();
        const idTarea = parseInt(obtenerIdUrl());
        const indiceTarea = tareas.findIndex((tarea) => tarea.id === idTarea);
        if (indiceTarea !== -1) {
            tareas.splice(indiceTarea, 1);
            guardarTareas(tareas);
            alert("Tarea eliminada correctamente.");
            location.href = "index.html";
        }
    }
});


