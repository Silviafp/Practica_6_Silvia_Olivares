import { formatearFechaAnnoMesDia } from "./commons.js";
import { validarFormulario } from "./form.js";
import { cargarTareas, guardarTareas } from "./storage.js";

export function crearTarea(evento) {
    const validado = validarFormulario(evento.target);
    if (!validado) {
        return;
    }
    const formulario = new FormData(evento.target);

    const nuevaTarea = {
        id: parseInt(formulario.get("id")),
        titulo: formulario.get("titulo"),
        descripcion: formulario.get("descripcion"),
        prioridad: formulario.get("prioridad"),
        fechaVencimiento: formulario.get("fechaVencimiento"),
        estado: "porHacer",
        creadoEl: formatearFechaAnnoMesDia(new Date()),
    };

    const tareas = cargarTareas();
    tareas.push(nuevaTarea);

    guardarTareas(tareas);
    alert(`Tarea "${nuevaTarea.titulo}" creada correctamente.`);
    location.reload();
}

export function editarTarea(evento) {
    const validado = validarFormulario(evento.target);
    if (!validado) {
        return;
    }
    const formulario = new FormData(evento.target);

    const tareaEditada = {
        id: parseInt(formulario.get("id")),
        titulo: formulario.get("titulo"),
        descripcion: formulario.get("descripcion"),
        prioridad: formulario.get("prioridad"),
        fechaVencimiento: formulario.get("fechaVencimiento"),
        estado: formulario.get("estado"),
    };

    const tareas = cargarTareas();
    const indice = tareas.findIndex((t) => t.id === tareaEditada.id);
    const tareaOriginal = tareas[indice];

    tareas[indice] = {
        ...tareaOriginal,
        ...tareaEditada,
    };
    
    guardarTareas(tareas);
    alert(`Tarea "${tareas[indice].titulo}" editada correctamente.`);
    location.href = `view-task.html?id=${tareaEditada.id}`;
}