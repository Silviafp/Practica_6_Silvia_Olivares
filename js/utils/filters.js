import { limpiarNodo } from "./commons.js";
import { renderizarTablero } from "./kanban.js";
import { cargarTareas } from "./storage.js";

let filtrosActivos = {
    nombre: "",
    estado: "all",
    prioridad: "all"
};

const aplicarFiltros = () => {
    const tareas = cargarTareas();
    
    let tareasFiltradas = tareas.filter((tarea) => {
        if (filtrosActivos.nombre.length > 0) {
            const coincideNombre = tarea.titulo.toLowerCase().includes(filtrosActivos.nombre) || 
                                   tarea.descripcion.toLowerCase().includes(filtrosActivos.nombre);
            if (!coincideNombre) return;
        }
        
        if (filtrosActivos.estado !== "all") {
            if (tarea.estado !== filtrosActivos.estado) return;
        }

        if (filtrosActivos.prioridad !== "all") {
            if (tarea.prioridad !== filtrosActivos.prioridad) return;
        }
        
        return true;
    });
    
    renderizarTablero(tareasFiltradas, true);
    renderizarContador(tareas, tareasFiltradas);
};

const filtroPorNombre = () => {
    const filtro = document.querySelector("#filter-name");
    filtro.addEventListener("input", (evento) => {
        const valorFiltro = evento.target.value.toLowerCase().trim();
        filtrosActivos.nombre = valorFiltro;

        if (valorFiltro.length === 0) {
            aplicarFiltros();
            return;
        }
        if (valorFiltro.length < 3) return;
        
        setTimeout(() => {
            aplicarFiltros();
        }, 1500);

    });

}

const filtroPorEstado = () => {
    const filtro = document.querySelector("#filter-status");
    filtro.addEventListener("change", (evento) => {
        const valorFiltro = evento.target.value;
        filtrosActivos.estado = valorFiltro;
        aplicarFiltros();
    });
};

const filtroPorPrioridad = () => {
    const filtro = document.querySelector("#filter-priority");
    filtro.addEventListener("change", (evento) => {
        const valorFiltro = evento.target.value;
        filtrosActivos.prioridad = valorFiltro;
        aplicarFiltros();
    });
}

const renderizarContador = (tareas, filtradas = null) => {
    if (filtradas === null) filtradas = tareas;
    const contadorFiltros = document.querySelector("#filter-count");
    limpiarNodo(contadorFiltros);
    const contadorTextos = `${filtradas.length}/${tareas.length}`;
    const nodoContadorTextos = document.createTextNode(contadorTextos);
    contadorFiltros.appendChild(nodoContadorTextos);
}

export const inicializarFiltros = () => {
    const tareas = cargarTareas();
    renderizarContador(tareas);
    filtroPorNombre();
    filtroPorEstado();
    filtroPorPrioridad();
}