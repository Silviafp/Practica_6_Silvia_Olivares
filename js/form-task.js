import { cargarTareas, guardarTareas } from "./utils/storage.js";
import { inicializarFormulario, validarFormulario } from "./utils/form.js";
import { formatearFechaAnnoMesDia, obtenerIdUrl } from "./utils/commons.js";
import { crearTarea, editarTarea } from "./utils/tasks.js";

const id = obtenerIdUrl() || "";
inicializarFormulario(id);

document.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (id && id.trim() !== "") {
        editarTarea(evento);
    } else {
        crearTarea(evento);
    }
});