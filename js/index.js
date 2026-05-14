import { formatearFechaAnnoMesDia } from "./utils/commons.js";
import { cargarTareas, guardarTareas } from "./utils/storage.js";
import { renderizarTablero } from "./utils/kanban.js";
import { inicializarFiltros } from "./utils/filters.js";

const tareas = cargarTareas();
renderizarTablero(tareas);
inicializarFiltros();
