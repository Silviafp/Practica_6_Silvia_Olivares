
const STORAGE_KEY = 'tasksKanban';

export function guardarTareas(tareas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}

export function cargarTareas() {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
}